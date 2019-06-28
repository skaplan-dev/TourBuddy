import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'metersToMiles'
})
export class MetersToMilesPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return (value / 1609.344).toFixed(2);
  }
}
