import {
  Component,
  Input,
  ViewChild,
  SimpleChanges,
  OnChanges,
  OnInit
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { forEach, _map } from 'lodash';
import { DirectionsService } from 'src/app/services/directions.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnChanges {
  @ViewChild('map', { static: false }) map: any;
  @Input() directions: any;
  public directionsId: string;

  constructor(private directionsService: DirectionsService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.directions.firstChange) {
      this.directions = changes.directions.currentValue[0];
      this.drawMap();
    }
  }

  public drawMap() {
    if (this.map && this.directions) {
      this.directions.waypoints = this.getWaypoints(this.directions);
      this.updateMap(this.directions);
      this.setBounds(this.directions);
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
    this.directionsService.resetDirectionsService();
  }
}
