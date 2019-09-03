import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'firebase';
import { Observable, Subscription } from 'rxjs';
import { FileService } from 'src/app/services/file.service';
import { UploadXHRArgs, NzMessageService } from 'ng-zorro-antd';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  public user$: Observable<User>;
  public user: User;
  public displayName: string;
  public email: string;
  public showEdit: boolean = false;
  public subscriptionArr: Subscription[] = [];

  constructor(
    private afa: AngularFireAuth,
    private fileService: FileService,
    private authService: AuthService,
    private msgService: NzMessageService
  ) {}

  public ngOnInit() {
    this.user$ = this.afa.user;
    this.subscriptionArr.push(
      this.user$.subscribe(user => {
        this.user = user;
        this.displayName = user.displayName;
        this.email = user.email;
      })
    );
  }

  public ngOnDestroy() {
    this.subscriptionArr.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  public saveProfile() {
    this.authService.updateProfile({
      email: this.email,
      displayName: this.displayName
    });
    this.msgService.success('Profile saved successfully');
    this.showEdit = false;
  }

  public changePassword() {
    this.authService.changePassword();
    this.msgService.success(
      'A link has been sent to your email to change your password'
    );
  }

  public customReq = async (item: UploadXHRArgs) => {
    const uploadObj = this.fileService.uploadFile(item.file);
    const flyerRef = uploadObj.filePath;
    uploadObj.task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.fileService.getDownloadURL(flyerRef).subscribe(downloadUrl => {
            this.authService.updateProfile({ photoURL: downloadUrl });
            if (this.user.photoURL && this.user.providerId !== 'google.com') {
              this.fileService.deleteFileFromURL(this.user.photoURL);
            }
            this.msgService.success('Successfully changed profile photo');
          });
        })
      )
      .subscribe();
  }
}
