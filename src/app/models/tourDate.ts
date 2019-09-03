import { Contact } from './contact';

export interface TourDate {
  date: Date;
  contact: Contact;
  location: string;
  venue: string;
  guarantee: number;
  status: string;
  notes: string;
  id: string;
}
