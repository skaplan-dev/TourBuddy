import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TourDate } from 'src/app/models/tourDate';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material';
import { Contact } from 'src/app/models/contact';
import { ReplaySubject } from 'rxjs';
import { MapboxService } from 'src/app/services/mapbox.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-tour-detail-form',
  templateUrl: './tour-detail-form.component.html',
  styleUrls: ['./tour-detail-form.component.css']
})
export class TourDetailFormComponent implements OnInit {
  @Input() tourDate: any;
  @Output() tourSaved: EventEmitter<any> = new EventEmitter<any>();
  @Output() tourDeleted: EventEmitter<any> = new EventEmitter<any>();
  public form: FormGroup;
  public contacts: Contact[] = [
    { name: 'Joe', email: 'joe@gmail.com', location: 'Boston, MA' },
    { name: 'Tom', email: 'joe@gmail.com', location: 'Baton Rouge, LA' },
    { name: 'Rob', email: 'joe@gmail.com', location: 'New York, New York' },
    { name: 'Jess', email: 'joe@gmail.com', location: 'San Francisco, CA' }
  ];
  constructor(private fb: FormBuilder, private mapboxService: MapboxService) {}

  ngOnInit() {
    this.form = this.fb.group({
      contact: [this.tourDate.contact],
      location: [
        this.tourDate.location,
        [Validators.required, Validators.minLength(5)]
      ],
      notes: [this.tourDate.notes],
      venue: [this.tourDate.venue],
      guarantee: [this.tourDate.guarantee],
      status: [this.tourDate.status]
    });
  }

  public validateLocation() {
    if (this.form.get('location').value !== this.tourDate.location) {
      this.mapboxService
        .getCoordinates(this.form.get('location').value)
        .subscribe((coordinates: any) => {
          if (coordinates.features.length > 0) {
            this.submit(coordinates.features[0].geometry, true);
          } else {
            this.form.get('location').setErrors({});
            return undefined;
          }
        });
    } else {
      this.submit(undefined, false);
    }
  }

  public submit(coordinates: any, locationChange: boolean) {
    const tourDate: TourDate = this.form.value;
    tourDate.date = this.tourDate.date;
    tourDate.id = this.tourDate.id;
    const emitObj = {
      tourDate: tourDate,
      locationChange: locationChange,
      coordinates: coordinates
    };

    this.tourSaved.emit(emitObj);
  }

  public deleteTourDate() {
    this.tourDeleted.emit(this.tourDate);
  }
}
