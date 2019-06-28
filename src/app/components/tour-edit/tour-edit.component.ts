import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatChipInputEvent
} from '@angular/material';
import { Tour } from 'src/app/models/tour';
import { FileService } from 'src/app/services/file.service';
import { omit, forEach } from 'lodash';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-tour-edit',
  templateUrl: './tour-edit.component.html',
  styleUrls: ['./tour-edit.component.css']
})
export class TourEditComponent implements OnInit {
  public bands = [];
  public form: FormGroup;
  public uploadPercent: Observable<number>;

  constructor(
    public dialogRef: MatDialogRef<TourEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private fileService: FileService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      tourName: [this.data.tourName, [Validators.required, Validators.maxLength(17)]],
      startDate: [this.data.startDate.toDate(), Validators.required],
      endDate: [this.data.endDate.toDate(), Validators.required],
      bandNames: [],
      file: []
    });

    forEach(this.data.bandNames, bandName => {
      this.bands.push({ name: bandName });
    });
  }

  public onSubmit() {
    const tour: Tour = omit(this.form.value, ['file']);
    tour.bandNames = this.bands.map(band => {
      return band.name;
    });

    tour.id = this.data.id;
    if (this.form.value.file) {
      this.uploadFileAndClose(tour);
    } else {
      this.dialogRef.close(tour);
    }
  }

  public uploadFileAndClose(tour: Tour) {
    const uploadObj = this.fileService.uploadFile(
      this.form.value.file.files[0]
    );
    tour.flyerRef = uploadObj.filePath;
    this.uploadPercent = uploadObj.task.percentageChanges();
    uploadObj.task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.fileService.deleteFile(this.data.flyerRef);
          this.dialogRef.close(tour);
        })
      )
      .subscribe();
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.bands.push({ name: value.trim() });
    }
    if (input) {
      input.value = '';
    }
  }

  remove(chip: any): void {
    const index = this.bands.indexOf(chip);

    if (index >= 0) {
      this.bands.splice(index, 1);
    }
  }
}
