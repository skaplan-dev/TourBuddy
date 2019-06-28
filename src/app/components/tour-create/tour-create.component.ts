import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatChipInputEvent
} from '@angular/material';
import { Tour } from 'src/app/models/tour';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { omit } from 'lodash';
import { FileService } from 'src/app/services/file.service';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tour-create',
  templateUrl: './tour-create.component.html',
  styleUrls: ['./tour-create.component.css']
})
export class TourCreateComponent implements OnInit {
  public bands = [];
  public form: FormGroup;
  public uploadPercent: Observable<number>;

  constructor(
    public dialogRef: MatDialogRef<TourCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Tour,
    private fb: FormBuilder,
    private fileService: FileService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      tourName: ['', [Validators.required, Validators.maxLength(17)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      bandNames: [],
      file: []
    });
  }

  public onSubmit() {
    const tour: Tour = omit(this.form.value, ['file']);
    tour.bandNames = this.bands.map(band => {
      return band.name;
    });
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
          this.dialogRef.close(tour);
        })
      )
      .subscribe();
  }

  public add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.bands.push({ name: value.trim() });
    }
    if (input) {
      input.value = '';
    }
  }

  public remove(chip: any): void {
    const index = this.bands.indexOf(chip);

    if (index >= 0) {
      this.bands.splice(index, 1);
    }
  }
}
