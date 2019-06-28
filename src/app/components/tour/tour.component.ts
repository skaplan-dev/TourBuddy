import { Component, OnInit, OnDestroy } from '@angular/core';
import { Tour } from 'src/app/models/tour';
import { TourService } from 'src/app/services/tour.service';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { TourCreateComponent } from '../tour-create/tour-create.component';
import { FileService } from 'src/app/services/file.service';
import { TourEditComponent } from '../tour-edit/tour-edit.component';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})
export class TourComponent implements OnInit, OnDestroy {
  public tours: Observable<Tour[]>;
  public showSpinner: boolean = true;
  private toursSubscription: Subscription;
  public defaultImage =
    'https://www.publicdomainpictures.net/pictures/30000/nahled/plain-white-background.jpg';
  public showTours = false;
  constructor(
    private tourService: TourService,
    public dialog: MatDialog,
    private fileService: FileService
  ) {}

  ngOnInit() {
    this.tours = this.tourService
      .getTours()
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Tour;
            if (data.flyerRef) {
              data.src = this.fileService.getDownloadURL(data.flyerRef);
            }
            data.id = a.payload.doc.id;
            return data;
          })
        )
      );

    this.toursSubscription = this.tours.subscribe(() => {
      this.showSpinner = false;
    });
  }

  public createTour() {
    const dialogRef = this.dialog.open(TourCreateComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.tourService.createTour(result as Tour);
      }
    });
  }

  public editTour(tour: Tour) {
    const dialogRef = this.dialog.open(TourEditComponent, {
      width: '400px',
      data: tour
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.tourService.updateTour(result as Tour);
      }
    });
  }

  public ngOnDestroy() {
    this.toursSubscription.unsubscribe();
  }

  public onCogClick(event) {
    event.stopPropagation();
  }
}
