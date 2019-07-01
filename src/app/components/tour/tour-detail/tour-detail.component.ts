import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TourDate } from 'src/app/models/tourDate';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { MapComponent } from '../map/map.component';
import { DirectionsService } from 'src/app/services/directions.service';
import { TourService } from 'src/app/services/tour.service';
import { MatDialog } from '@angular/material';
import { TourDateCreateComponent } from '../tourDate/tour-date-create/tour-date-create.component';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.css']
})
export class TourDetailComponent implements OnInit, OnDestroy {
  @ViewChild(MapComponent)
  private mapComponent: MapComponent;
  private tourDateSubscription: Subscription;
  public tourDates: Observable<TourDate[]>;
  public showSpinner: boolean = true;
  public tourId: string;
  public tourName: string;

  constructor(
    private route: ActivatedRoute,
    private tourService: TourService,
    private directionsService: DirectionsService,
    public dialog: MatDialog,
    private orderPipe: OrderPipe
  ) {}

  ngOnInit() {
    this.tourDates = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.tourId = params.get('id');
        this.tourName = params.get('tourName');
        return this.tourService
          .getTourDates(this.tourId)
          .snapshotChanges()
          .pipe(
            map(actions =>
              actions.map(a => {
                return a.payload.doc.data() as TourDate;
              })
            )
          );
      })
    );
    this.tourDateSubscription = this.tourDates.subscribe(() => {
      this.showSpinner = false;
    });
  }

  public clearDirections() {
    this.directionsService.clearDirections(this.tourId);
    this.mapComponent.clearMap();
  }

  // public getCoordinates(searchText: string) {
  //   this.mapboxService
  //     .getCoordinates(searchText)
  //     .subscribe((coordinates: any) => {
  //       this.directionsService.addWaypoint(
  //         coordinates.features[0].geometry,
  //         this.tourId
  //       );
  //     });
  // }

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
}
