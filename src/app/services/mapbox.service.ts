import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.dev';
import { forEach } from 'lodash';
import { Geometry } from '../models/mapbox';
import { Observable } from 'rxjs';
const directionsURL = 'https://api.mapbox.com/directions/v5/mapbox/driving/';
const coordinatesURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const keyUrl = 'access_token=' + environment.mapbox.accessToken;

@Injectable({
  providedIn: 'root'
})
export class MapboxService {
  constructor(private http: HttpClient) {}

  public getCoordinates(searchText: string) {
    return this.http.get(coordinatesURL + searchText + '.json?' + keyUrl);
  }

  public getDirections(waypoints: any): Observable<any> {
    let coordinates: string = '';
    forEach(waypoints, (waypoint: Geometry, index: number) => {
      coordinates += waypoint[0] + ',' + waypoint[1];
      if (index !== waypoints.length - 1) {
        coordinates += ';';
      }
    });
    return this.http.get(
      directionsURL + coordinates + '?geometries=geojson&' + keyUrl
    );
  }
}
