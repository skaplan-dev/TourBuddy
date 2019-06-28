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

  public clearWaypointsAndDirectionsID() {
    this.directions.waypoints = new Array();
    this.directionsId = undefined;
  }

  public setDirectionsId(directions: any) {
    this.directionsId = directions;
  }

  private setDirections(tourId: string) {
    this.db
      .doc<Tour>('tours/' + tourId)
      .collection<any>('directions')
      .doc(this.directionsId)
      .update(this.directions);
  }
}
