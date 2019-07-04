import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatChipInputEvent,
  MatSelect
} from '@angular/material';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { Contact } from 'src/app/models/contact';
import { MapboxService } from 'src/app/services/mapbox.service';
import { TourDate } from 'src/app/models/tourDate';

@Component({
  selector: 'app-tour-date-create',
  templateUrl: './tour-date-create.component.html',
  styleUrls: ['./tour-date-create.component.css']
})
export class TourDateCreateComponent implements OnInit {
  @ViewChild('singleSelect', { static: false }) singleSelect: MatSelect;

  public form: FormGroup;
  public bands = [];
  public contacts: Contact[] = [
    { name: 'Joe', email: 'joe@gmail.com', location: 'Boston, MA' },
    { name: 'Tom', email: 'joe@gmail.com', location: 'Baton Rouge, LA' },
    { name: 'Rob', email: 'joe@gmail.com', location: 'New York, New York' },
    { name: 'Jess', email: 'joe@gmail.com', location: 'San Francisco, CA' }
  ];
  public contactsFilterCtrl: FormControl = new FormControl('');
  public filteredContacts: ReplaySubject<Contact[]> = new ReplaySubject<
    Contact[]
  >(1);

  constructor(
    public dialogRef: MatDialogRef<TourDateCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private mapboxService: MapboxService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      date: ['', Validators.required],
      contact: [''],
      bandNames: [],
      location: ['', [Validators.required, Validators.minLength(5)]],
      notes: ['']
    });

    this.filteredContacts.next(this.contacts.slice());

    this.contactsFilterCtrl.valueChanges.subscribe(() => {
      this.filterContacts();
    });
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

  protected filterContacts() {
    if (!this.contacts) {
      return;
    }
    let search = this.contactsFilterCtrl.value;
    if (!search) {
      this.filteredContacts.next(this.contacts.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredContacts.next(
      this.contacts.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
    );
  }

  public getCoordinatesAndSubmit() {
    this.mapboxService
      .getCoordinates(this.form.get('location').value)
      .subscribe((coordinates: any) => {
        if (coordinates.features.length > 0) {
          this.submit(coordinates.features[0].geometry);
        } else {
          this.form.get('location').setErrors({});
          return undefined;
        }
      });
  }

  public submit(coordinates: any) {
    const tourDate: TourDate = this.form.value;
    tourDate.bandNames = this.bands.map(band => {
      return band.name;
    });
    this.dialogRef.close({
      coordinates: coordinates,
      tourDate: tourDate
    });
  }
}
