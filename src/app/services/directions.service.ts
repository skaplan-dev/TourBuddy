import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MapboxService } from './mapbox.service';
import { Tour } from '../models/tour';
import { forEach, sortBy, findIndex } from 'lodash';
import {
  getFormattedFirstDirections,
  getFormattedLegs
} from './utils/directions.utils';

@Injectable({
  providedIn: 'root'
})
export class DirectionsService {
  public directionsId: string;
  public directions: any = { legs: new Array() };

  constructor(
    private db: AngularFirestore,
    private mapboxService: MapboxService
  ) {}

  public addWaypoint(waypoint: any, tourId: string, date: Date) {
    waypoint = [waypoint.coordinates[0], waypoint.coordinates[1]];
    if (this.directions.legs.length === 0) {
      this.setFirstWaypoint(waypoint, tourId, date);
    } else {
      this.insertWaypoint(waypoint, tourId, date);
    }
  }

  private insertWaypoint(waypoint: any, tourId: string, date: Date) {
    const directionsShell = getFormattedFirstDirections(waypoint, date);
    this.directions.legs.push(directionsShell.legs[0]);
    this.directions.legs = sortBy(this.directions.legs, leg => {
      return leg.date;
    });
    const index = findIndex(this.directions.legs, leg => {
      return leg === directionsShell.legs[0];
    });

    switch (index) {
      case 0:
        this.concatFrontWaypoint(waypoint, tourId);
        break;

      case this.directions.legs.length - 1:
        this.concatEndWaypoint(waypoint, tourId);
        break;

      default:
        this.concatMiddleWaypoint(waypoint, tourId, index);
        break;
    }
  }

  public concatMiddleWaypoint(waypoint: any, tourId: string, index: number) {
    this.mapboxService
      .getDirections([this.directions.legs[index - 1].waypoint, waypoint])
      .subscribe(directions => {
        const newDirectionsObj = this.directions.legs[index - 1];
        const newDirections = {
          date: newDirectionsObj.date,
          waypoint: newDirectionsObj.waypoint,
          geometry: { ...directions.routes[0].geometry.coordinates },
          legs: { ...directions.routes[0].legs[0] }
        };
        this.directions.legs[index - 1] = newDirections;
        this.setDirections(tourId);
      });

    this.mapboxService
      .getDirections([waypoint, this.directions.legs[index + 1].waypoint])
      .subscribe(directions => {
        this.directions.legs[index] = {
          ...this.directions.legs[index],
          ...getFormattedLegs(directions)
        };
        this.setDirections(tourId);
      });
  }

  private concatFrontWaypoint(waypoint: any, tourId: string) {
    if (this.directions.legs.length > 1) {
      this.mapboxService
        .getDirections([waypoint, this.directions.legs[1].waypoint])
        .subscribe(directions => {
          this.directions.legs[0] = {
            ...this.directions.legs[0],
            ...getFormattedLegs(directions)
          };
          this.setDirections(tourId);
        });
    }
    this.setDirections(tourId);
  }

  public concatEndWaypoint(waypoint: any, tourId: string) {
    const length = this.directions.legs.length - 2;
    this.mapboxService
      .getDirections([this.directions.legs[length].waypoint, waypoint])
      .subscribe(directions => {
        this.directions.legs[length] = {
          ...this.directions.legs[length],
          ...getFormattedLegs(directions)
        };
        this.setDirections(tourId);
      });
  }

  private setFirstWaypoint(waypoint: any, tourId: string, date: Date) {
    const formattedDirections = getFormattedFirstDirections(waypoint, date);
    this.db
      .doc<Tour>('tours/' + tourId)
      .collection<any>('directions')
      .add(formattedDirections);
  }

  public clearDirections(tourId: string) {
    this.db
      .doc<Tour>('tours/' + tourId)
      .collection<any>('directions')
      .doc(this.directionsId)
      .delete();
  }

  public getDirections(tourId: string) {
    return this.db.doc<Tour>('tours/' + tourId).collection('directions');
  }

  public setLocalDirections(directions: any) {
    if (directions.legs) {
      this.directions.legs = new Array();
      forEach(directions.legs, leg => {
        this.directions.legs.push(leg);
      });
    }
  }

  public resetDirectionsService() {
    this.directions = { legs: new Array() };
    this.directionsId = undefined;
  }

  public setDirectionsId(directions: any) {
    this.directionsId = directions;
  }

  public removeWaypoint(date: any, tourId: string) {
    const index = findIndex(this.directions.legs, leg => {
      const oldDate = new Date(leg.date);
      const newDate = date.toDate();
      return oldDate.getTime() === newDate.getTime();
    });

    switch (index) {
      case 0:
        this.removeFrontWaypoint(tourId);
        break;
      case this.directions.legs.length - 1:
        this.removeEndWaypoint(tourId);
        break;
      default:
        this.removeMiddleWaypoint(index, tourId);
    }

    if (!this.directions.legs.length) {
      this.deleteDirections(tourId);
    }
  }

  private removeFrontWaypoint(tourId: string) {
    this.directions.legs.shift();
    this.setDirections(tourId);
  }

  private removeMiddleWaypoint(index: number, tourId: string) {
    this.mapboxService
      .getDirections([
        this.directions.legs[index - 1].waypoint,
        this.directions.legs[index + 1].waypoint
      ])
      .subscribe(directions => {
        const newDirectionsObj = this.directions.legs[index - 1];
        const newDirections = {
          date: newDirectionsObj.date,
          waypoint: newDirectionsObj.waypoint,
          geometry: { ...directions.routes[0].geometry.coordinates },
          legs: { ...directions.routes[0].legs[0] }
        };
        this.directions.legs[index - 1] = newDirections;
        this.directions.legs.splice(index, 1);
        this.setDirections(tourId);
      });
  }

  private removeEndWaypoint(tourId: string) {
    this.directions.legs.pop();
    const length = this.directions.legs.length - 1;
    this.directions.legs[length] = {
      date: this.directions.legs[length].date,
      waypoint: this.directions.legs[length].waypoint
    };
    this.setDirections(tourId);
  }

  private setDirections(tourId: string) {
    this.db
      .doc<Tour>('tours/' + tourId)
      .collection<any>('directions')
      .doc(this.directionsId)
      .update(this.directions);
  }

  private deleteDirections(tourId: string) {
    this.db
      .doc<Tour>('tours/' + tourId)
      .collection('directions')
      .doc(this.directionsId)
      .delete();
  }

  public updateWaypoint(waypoint: any, tourId: string, date: any) {
    const index = findIndex(this.directions.legs, leg => {
      const oldDate = new Date(leg.date);
      const dateToCheck = date.toDate();
      return oldDate.getTime() === dateToCheck.getTime();
    });
    waypoint = [waypoint.coordinates[0], waypoint.coordinates[1]];
    this.directions.legs[index] = getFormattedFirstDirections(
      waypoint,
      date.toDate()
    ).legs[0];
    switch (index) {
      case 0:
        this.concatFrontWaypoint(waypoint, tourId);
        break;
      case this.directions.legs.length - 1:
        this.concatEndWaypoint(waypoint, tourId);
        break;
      default:
        this.concatMiddleWaypoint(waypoint, tourId, index);
        break;
    }
  }
}
