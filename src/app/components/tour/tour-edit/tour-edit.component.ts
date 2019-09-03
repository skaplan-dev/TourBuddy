import { Component, OnInit, Input, EventEmitter, DoCheck } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FileService } from 'src/app/services/file.service';
import { UploadFile } from 'ng-zorro-antd';

@Component({
  selector: 'app-tour-edit',
  templateUrl: './tour-edit.component.html',
  styleUrls: ['./tour-edit.component.css']
})
export class TourEditComponent implements OnInit, DoCheck {
  @Input() tour: any;
  public bands = [];
  public form: FormGroup;
  public fileList: UploadFile[] = [];
  public formValid: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder, private fileService: FileService) {}

  ngOnInit() {
    this.form = this.fb.group({
      tourName: [
        this.tour.tourName,
        [Validators.required, Validators.maxLength(17)]
      ],
      startDate: [this.tour.startDate.toDate(), Validators.required],
      endDate: [this.tour.endDate.toDate(), Validators.required],
      file: []
    });
  }

  public ngDoCheck() {
    if (this.form.valid) {
      this.formValid.emit(true);
    } else {
      this.formValid.emit(false);
    }
  }

  public beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  }
}
