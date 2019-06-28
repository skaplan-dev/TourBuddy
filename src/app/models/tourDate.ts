import { Contact } from './contact';

export interface TourDate {
  date: Date;
  contact: Contact;
  bandNames: string[];
  location: string;
  notes: string;
  id: string;
}
