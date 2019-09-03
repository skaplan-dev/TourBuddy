import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import * as uuid from 'uuid';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(private storage: AngularFireStorage) {}

  public uploadFile(file) {
    const filePath = uuid.v4();
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    return { filePath: filePath, fileRef: fileRef, task: task };
  }

  public getDownloadURL(filePath: string): Observable<any> {
    const ref = this.storage.ref(filePath);
    return ref.getDownloadURL();
  }

  public deleteFile(filePath) {
    console.log(filePath);
    this.storage.ref(filePath).delete();
  }

  public deleteFileFromURL(url: string) {
    this.storage.storage.refFromURL(url).delete();
  }
}
