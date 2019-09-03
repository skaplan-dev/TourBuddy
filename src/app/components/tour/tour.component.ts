import { Component, OnInit, OnDestroy } from '@angular/core';
import { Tour } from 'src/app/models/tour';
import { TourService } from 'src/app/services/tour.service';
import { map, finalize } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { FileService } from 'src/app/services/file.service';
import { NzModalService, NzModalRef } from 'ng-zorro-antd';
import { TourCreateComponent } from './tour-create/tour-create.component';
import { omit } from 'lodash';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})
export class TourComponent implements OnInit, OnDestroy {
  public tours: Observable<Tour[]>;
  public modalRef: NzModalRef;
  public subscriptionArr: Subscription[] = [];

  constructor(
    private tourService: TourService,
    private fileService: FileService,
    private modal: NzModalService
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
              data.src.loaded = false;
            }
            data.id = a.payload.doc.id;
            return data;
          })
        )
      );
  }

  public openModal() {
    this.modalRef = this.modal.create({
      nzContent: TourCreateComponent,
      nzTitle: 'Create Tour',
      nzOnCancel: this.closeModal.bind(this),
      nzOnOk: this.createTour.bind(this)
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

  public createTour() {
    this.setOkLoading(true);
    const form = this.modalRef.getContentComponent().form;
    const file = this.modalRef.getContentComponent().fileList[0];
    const tour: Tour = omit(form.value, ['file']);
    if (file) {
      this.uploadFileAndClose(tour, file);
    } else {
      this.tourService.createTour(tour);
    }
  }

  public uploadFileAndClose(tour: Tour, file: any) {
    const uploadObj = this.fileService.uploadFile(file);
    tour.flyerRef = uploadObj.filePath;
    uploadObj.task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.tourService.createTour(tour);
          this.setOkLoading(false);
          this.modalRef.close();
        })
      )
      .subscribe();
  }

  public setOkLoading(value: boolean) {
    this.modalRef.getInstance().nzOkLoading = value;
  }

  public closeModal() {
    this.modalRef.close();
  }

  public ngOnDestroy() {
    this.subscriptionArr.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
