import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TourDate } from 'src/app/models/tourDate';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap, map, finalize } from 'rxjs/operators';
import { DirectionsService } from 'src/app/services/directions.service';
import { TourService } from 'src/app/services/tour.service';
import { TourDateCreateComponent } from '../tourDate/tour-date-create/tour-date-create.component';
import { MapboxDirections } from 'src/app/models/mapbox';
import { FileService } from 'src/app/services/file.service';
import {
  NzModalService,
  NzModalRef,
  NzMessageService,
  UploadXHRArgs
} from 'ng-zorro-antd';
import { MapboxService } from 'src/app/services/mapbox.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { TourEditComponent } from '../tour-edit/tour-edit.component';
import { Tour } from 'src/app/models/tour';
import { omit } from 'lodash';

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.css']
})
export class TourDetailComponent implements OnInit, OnDestroy {
  private subscriptionArr: Subscription[] = [];
  public tourDates: Observable<TourDate[]>;
  public showSpinner: boolean = true;
  public tourId: string;
  public directions: Observable<MapboxDirections[]>;
  public tour: Observable<any>;
  public centerContent = 'tourDates';
  public modalRef: NzModalRef;
  public isMobile: boolean;

  constructor(
    private route: ActivatedRoute,
    private tourService: TourService,
    private directionsService: DirectionsService,
    private modal: NzModalService,
    private router: Router,
    private fileService: FileService,
    private mapboxService: MapboxService,
    private message: NzMessageService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.subscriptionArr.push(
      this.breakpointObserver
        .observe([Breakpoints.Handset])
        .subscribe(result => {
          if (result.matches) {
            this.isMobile = true;
          } else {
            this.isMobile = false;
          }
        })
    );

    this.tourDates = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.tourId = params.get('id');

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

        this.tour = this.tourService.getTour(this.tourId).snapshotChanges();

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

    this.subscriptionArr.push(
      this.tourDates.subscribe(() => {
        this.showSpinner = false;
      }),
      this.tour.subscribe(tour => {
        const data = tour.payload.data();
        if (data) {
          if (data.flyerRef) {
            data.src = this.fileService.getDownloadURL(data.flyerRef);
            data.src.loaded = false;
          }
          this.tour = data;
        }
      })
    );
  }

  public openTourDateCreateModal() {
    this.modalRef = this.modal.create({
      nzContent: TourDateCreateComponent,
      nzTitle: 'Create Tour Date',
      nzOnCancel: this.closeModal.bind(this),
      nzOnOk: this.checkLocation.bind(this)
    });
    this.modalRef.getInstance().nzOkText = 'Create';
    this.modalRef.getInstance().nzOkDisabled = true;
    this.modalRef.open();

    this.subscriptionArr.push(
      this.modalRef.afterOpen.subscribe(() => {
        this.modalRef.getContentComponent().formValid.subscribe(formValid => {
          if (formValid) {
            this.modalRef.getInstance().nzOkDisabled = !formValid;
          }
        });
      }),
      this.modalRef.afterClose.subscribe(() => {
        this.modalRef.close();
        this.modalRef.destroy();
      })
    );
  }

  public openTourEditModal() {
    this.modalRef = this.modal.create({
      nzContent: TourEditComponent,
      nzComponentParams: { tour: this.tour },
      nzTitle: 'Edit Tour',
      nzOnCancel: this.closeModal.bind(this),
      nzOnOk: this.updateTour.bind(this)
    });
    this.modalRef.getInstance().nzOkText = 'Save';
    this.modalRef.getInstance().nzOkDisabled = true;
    this.modalRef.open();
    this.subscriptionArr.push(
      this.modalRef.afterOpen.subscribe(() => {
        this.modalRef.getContentComponent().formValid.subscribe(formValid => {
          if (formValid) {
            this.modalRef.getInstance().nzOkDisabled = !formValid;
          }
        });
      }),
      this.modalRef.afterClose.subscribe(() => {
        this.modalRef.close();
        this.modalRef.destroy();
      })
    );
  }

  public closeModal() {
    this.modalRef.close();
  }

  public ngOnDestroy() {
    this.subscriptionArr.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  public checkLocation() {
    const form = this.modalRef.getContentComponent().form;
    this.mapboxService
      .getCoordinates(form.get('location').value)
      .subscribe((coordinates: any) => {
        if (coordinates.features.length > 0) {
          this.createTourDate(coordinates.features[0].geometry, form);
        } else {
          this.message.error('Invalid location');
        }
      });
  }

  public createTourDate(coordinates, form) {
    this.tourService.createTourDate(form.value, this.tourId);
    this.directionsService.addWaypoint(
      coordinates,
      this.tourId,
      form.value.date
    );
  }

  public updateTourDate(event) {
    if (event.locationChange) {
      this.directionsService.updateWaypoint(
        event.coordinates,
        this.tourId,
        event.tourDate.date
      );
    }
    this.tourService.updateTourDate(event.tourDate, this.tourId);
  }

  public updateTour() {
    const form = this.modalRef.getContentComponent().form;
    const file = this.modalRef.getContentComponent().fileList[0];
    const tour: Tour = omit(form.value, ['file']);
    tour.id = this.tourId;
    if (file) {
      this.uploadFileAndClose(tour, file);
    } else {
      this.tourService.updateTour(tour);
    }
  }

  public uploadFileAndClose(tour: Tour, file: any) {
    const uploadObj = this.fileService.uploadFile(file);
    tour.flyerRef = uploadObj.filePath;
    uploadObj.task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.tourService.updateTour(tour);
          this.modalRef.close();
        })
      )
      .subscribe();
  }

  public getStatusTagColor(tourDate: TourDate): string {
    if (tourDate) {
      switch (tourDate.status) {
        case 'In Progress':
          return 'gold';
        case 'Not Booked':
          return 'red';
        case 'Booked':
          return 'green';
      }
    }
  }

  public deleteTourDate(event) {
    this.tourService.deleteTourDate(event, this.tourId);
    this.directionsService.removeWaypoint(event.date, this.tourId);
  }

  public onBackToggle() {
    this.router.navigate(['/', 'dashboard', { outlets: { main: ['tours'] } }]);
  }

  public setCenterContent(name: string) {
    this.centerContent = name;
  }

  public customReq = (item: UploadXHRArgs) => {
    const uploadObj = this.fileService.uploadFile(item.file);
    const flyerRef = uploadObj.filePath;
    uploadObj.task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.tourService.updateTourFlyer(this.tourId, flyerRef);
        })
      )
      .subscribe();
  }

  public deleteTour() {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to delete this tour?',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.tourService.deleteTour(this.tourId).then(() => {
          this.router.navigate(['dashboard', { outlets: { main: 'tours' } }]);
        });
      },
      nzCancelText: 'No',
      nzOnCancel: this.closeModal.bind(this)
    });
  }
}
