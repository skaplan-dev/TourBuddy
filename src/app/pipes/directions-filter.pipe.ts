import { Pipe, PipeTransform } from '@angular/core';
import { MapboxDirections } from '../models/mapbox';

@Pipe({
  name: 'directionsFilter'
})
export class DirectionsFilterPipe implements PipeTransform {
  transform(directions: MapboxDirections, index: number): any {
    if (directions) {
      if (directions[0].legs[index].legs !== undefined) {
        const hours = directions[0].legs[index].legs.duration / 3600;
        return hours >= 10 ? hours.toFixed(1) : hours.toFixed(2);
      } else {
        return (0 + 0).toFixed(2);
      }
    }
  }
}
