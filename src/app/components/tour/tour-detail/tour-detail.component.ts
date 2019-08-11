import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TourDate } from 'src/app/models/tourDate';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { DirectionsService } from 'src/app/services/directions.service';
import { TourService } from 'src/app/services/tour.service';
import { MatDialog } from '@angular/material';
import { TourDateCreateComponent } from '../tourDate/tour-date-create/tour-date-create.component';
import { OrderPipe } from 'ngx-order-pipe';
import { MapboxDirections } from 'src/app/models/mapbox';

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.css']
})
export class TourDetailComponent implements OnInit, OnDestroy {
  private tourDateSubscription: Subscription;
  public tourDates: Observable<TourDate[]>;
  public showSpinner: boolean = true;
  public tourId: string;
  public tourName: string;
  public directions: Observable<MapboxDirections[]>;

  constructor(
    private route: ActivatedRoute,
    private tourService: TourService,
    private directionsService: DirectionsService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.tourDates = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.tourId = params.get('id');
        this.tourName = params.get('tourName');
        this.directionsService.resetDirectionsService();
        this.directions = this.directionsService
          .getDirections(this.tourId)
          .snapshotChanges()
          .pipe(
            map(actions =>
              actions.map(a => {
                const data = a.payload.doc.data() as any;
                this.directionsService.setLocalDirections(data);
                const directionsId = a.payload.doc.id;
                if (!directionsId) {
                  this.directionsService.resetDirectionsService();
                } else {
                  this.directionsService.setDirectionsId(directionsId);
                }
                return data;
              })
            )
          );

        return this.tourService
          .getTourDates(this.tourId)
          .snapshotChanges()
          .pipe(
            map(actions =>
              actions.map(a => {
                const tourDate = a.payload.doc.data() as TourDate;
                tourDate.id = a.payload.doc.id;
                return tourDate;
              })
            )
          );
      })
    );

    this.tourDateSubscription = this.tourDates.subscribe(() => {
      this.showSpinner = false;
    });
  }

  public createTourDate() {
    const dialogRef = this.dialog.open(TourDateCreateComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tourService.createTourDate(
          result.tourDate as TourDate,
          this.tourId
        );
        this.directionsService.addWaypoint(
          result.coordinates,
          this.tourId,
          result.tourDate.date
        );
      }
    });
  }

  public ngOnDestroy() {
    this.tourDateSubscription.unsubscribe();
  }

  public updateTourDate(event) {
    this.tourService.updateTourDate(event.tourDate, this.tourId);
    if (event.locationChange) {
      this.directionsService.updateWaypoint(
        event.coordinates,
        this.tourId,
        event.tourDate.date
      );
    }
  }

  public deleteTourDate(event) {
    this.tourService.deleteTourDate(event, this.tourId);
    this.directionsService.removeWaypoint(event.date, this.tourId);
  }
}
