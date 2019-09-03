import { Component, OnInit, DoCheck, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-tour-date-create',
  templateUrl: './tour-date-create.component.html',
  styleUrls: ['./tour-date-create.component.css']
})
export class TourDateCreateComponent implements OnInit, DoCheck {
  public form: FormGroup;
  public contacts: Contact[] = [
    { name: 'Joe', email: 'joe@gmail.com', location: 'Boston, MA' },
    { name: 'Tom', email: 'joe@gmail.com', location: 'Baton Rouge, LA' },
    { name: 'Rob', email: 'joe@gmail.com', location: 'New York, New York' },
    { name: 'Jess', email: 'joe@gmail.com', location: 'San Francisco, CA' }
  ];
  public formValid: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      date: ['', Validators.required],
      location: ['', Validators.required],
      contact: [''],
      venue: [''],
      guarantee: [],
      notes: [''],
      status: ['', Validators.required]
    });
  }

  public ngDoCheck() {
    if (this.form.valid) {
      this.formValid.emit(true);
    } else {
      this.formValid.emit(false);
    }
  }
}
