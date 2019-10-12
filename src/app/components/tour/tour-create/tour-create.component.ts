import { Component, OnInit, EventEmitter, DoCheck } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UploadFile } from 'ng-zorro-antd';

@Component({
  selector: 'app-tour-create',
  templateUrl: './tour-create.component.html',
  styleUrls: ['./tour-create.component.css']
})
export class TourCreateComponent implements OnInit, DoCheck {
  public form: FormGroup;
  public fileList: UploadFile[] = [];
  public formValid: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder) {}

  public ngOnInit() {
    this.form = this.fb.group({
      tourName: ['', [Validators.required, Validators.maxLength(17)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
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
  };
}
