import { Directions } from 'src/app/models/mapbox';

export function getFormattedLegs(directions: Directions): any {
  return {
    geometry: { ...directions.routes[0].geometry.coordinates },
    legs: { ...directions.routes[0].legs[0] }
  };
}

export function getFormattedFirstDirections(waypoint: any, date: Date): any {
  return {
    legs: [
      {
        waypoint: waypoint,
        date: date.getTime()
      }
    ]
  };
}
