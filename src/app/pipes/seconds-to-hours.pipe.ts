import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsToHours'
})
export class SecondsToHoursPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return (value / 3600).toFixed(2);
  }
}
