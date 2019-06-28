import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MapboxDirections } from 'src/app/models/mapbox';
import * as mapboxgl from 'mapbox-gl';
import { forEach, size, sumBy, max, min, get, _map } from 'lodash';
import { TourStats } from 'src/app/models/tourStats';
import { DirectionsService } from 'src/app/services/directions.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @ViewChild('map') map: any;
  @Input() tourId: string;
  public directions: Observable<MapboxDirections[]>;
  public directionsId: string;
  public tourStats: TourStats = {
    numShows: 0,
    totalMiles: 0,
    hours: 0,
    longestDrive: 0,
    shortestDrive: 0
  };
  public showExpandIcon: boolean;
  public mapMoved: boolean;
  constructor(private directionsService: DirectionsService) {}

  ngOnInit() {}

  public drawGeo() {
    this.directions = this.directionsService
      .getDirections(this.tourId)
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as any;
            this.directionsService.setLocalDirections(data);
            this.directionsId = a.payload.doc.id;
            data.waypoints = this.getWaypoints(data);
            this.updateMap(data);
            this.setBounds(data);
            this.getStats(data);
            if (!this.directionsId) {
              this.directionsService.clearWaypointsAndDirectionsID();
            } else {
              this.directionsService.setDirectionsId(this.directionsId);
            }
            return data;
          })
        )
      );
  }

  public getStats(data: any) {
    this.tourStats.numShows = size(data.waypoints);
    if (data.legs.length > 1) {
      this.tourStats.totalMiles = sumBy(data.legs, leg => {
        return get(leg, 'legs.distance');
      });

      this.tourStats.hours = sumBy(data.legs, leg => {
        return get(leg, 'legs.duration');
      });
      const durationArray = new Array();
      forEach(data.legs, obj => {
        durationArray.push(get(obj, 'legs.duration'));
      });
      this.tourStats.longestDrive = max(durationArray);
      this.tourStats.shortestDrive = min(durationArray);
    }
  }

  public updateMap(data) {
    if (data.legs) {
      if (!this.map.MapService.getSource('directions')) {
        this.map.MapService.addSource('directions', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: this.getGeometry(data.legs)
          }
        });
        this.map.MapService.addLayer({
          layerOptions: {
            id: 'route',
            type: 'line',
            source: 'directions',
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#888',
              'line-width': 6
            }
          }
        });
      } else if (this.map.MapService.mapLoaded) {
        this.map.MapService.getSource('directions').setData({
          type: 'Feature',
          properties: {},
          geometry: this.getGeometry(data.legs)
        });
      }
    }
  }

  private setBounds(data) {
    const bounds = new mapboxgl.LngLatBounds();
    forEach(data.waypoints, waypoint => {
      bounds.extend(waypoint);
    });
    if (data.waypoints[1]) {
      this.map.MapService.fitBounds(bounds, { padding: 35 });
    } else {
      this.map.MapService.fitBounds(bounds, { padding: 35, maxZoom: 9 });
    }
  }

  public getWaypoints(data) {
    const arr = new Array();
    if (data.legs) {
      forEach(data.legs, leg => {
        arr.push(leg.waypoint);
      });
    }
    return arr;
  }

  public getGeometry(data) {
    if (data) {
      const coords = new Array();
      forEach(data, geo => {
        if (geo.geometry) {
          forEach(Object.values(geo.geometry), xy => {
            coords.push(xy);
          });
        }
      });
      return { coordinates: coords, type: 'LineString' };
    } else {
      return undefined;
    }
  }

  public clearMap() {
    this.map.MapService.getSource('directions').setData({
      type: 'Feature',
      properties: {}
    });
    this.resetStats();
    this.directionsService.clearWaypointsAndDirectionsID();
  }

  public resetStats() {
    this.tourStats = {
      numShows: 0,
      totalMiles: 0,
      hours: 0,
      longestDrive: 0,
      shortestDrive: 0
    };
  }

  public toggleMapPosition;
}
