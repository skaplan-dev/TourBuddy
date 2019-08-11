import { Injectable } from '@angular/core';
import { Tour } from '../models/tour';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { TourDate } from '../models/tourDate';

@Injectable({
  providedIn: 'root'
})
export class TourService {
  constructor(private db: AngularFirestore, private auth: AuthService) {}

  public createTour(tour: Tour) {
    const uid = { uid: this.auth.getUid() };
    const tourObj = { ...tour, ...uid };
    this.db.collection('tours').add(tourObj);
  }

  public getTours(): AngularFirestoreCollection<Tour> {
    return this.db.collection<Tour>('tours', ref =>
      ref.where('uid', '==', this.auth.getUid())
    );
  }

  public getTourDates(tourId: string): AngularFirestoreCollection<TourDate> {
    return this.db
      .doc<Tour>('tours/' + tourId)
      .collection<TourDate>('tourDates');
  }

  public updateTour(tour: Tour) {
    this.db
      .collection('tours')
      .doc(tour.id)
      .update(tour);
  }

  public createTourDate(tourDate: TourDate, tourId: string) {
    this.db
      .doc<Tour>('tours/' + tourId)
      .collection<any>('tourDates')
      .add(tourDate);
  }

  public deleteTourDates(tourId: string) {
    this.db.doc<Tour>('tours/' + tourId).collection<any>('tourDates');
  }

  public updateTourDate(tourDate: TourDate, tourId: string) {
    this.db
      .doc<Tour>('tours/' + tourId)
      .collection<any>('tourDates')
      .doc(tourDate.id)
      .update(tourDate);
  }

  public deleteTourDate(tourDate: TourDate, tourId: string) {
    this.db
      .doc<Tour>('tours/' + tourId)
      .collection<any>('tourDates')
      .doc(tourDate.id)
      .delete();
  }
}
