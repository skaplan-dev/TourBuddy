import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { TourStats } from 'src/app/models/tourStats';
import { isEmpty, sumBy, get, forEach, max, min } from 'lodash';

@Component({
  selector: 'app-driving-stats',
  templateUrl: './driving-stats.component.html',
  styleUrls: ['./driving-stats.component.css']
})
export class DrivingStatsComponent implements OnChanges {
  @Input() directions: any;
  public tourStats: TourStats = {
    totalMiles: 0,
    hours: 0,
    longestDrive: 0,
    shortestDrive: 0
  };

  ngOnChanges(changes: SimpleChanges) {
    if (
      !changes.directions.firstChange &&
      !isEmpty(changes.directions.currentValue)
    ) {
      this.getStats(changes.directions.currentValue[0]);
    }
  }

  public getStats(data: any) {
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

  public resetStats() {
    this.tourStats = {
      totalMiles: 0,
      hours: 0,
      longestDrive: 0,
      shortestDrive: 0
    };
  }
}
