import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit, OnDestroy {
  public user: User;
  public user$: Observable<User | null>;
  public subscriptionArr: Subscription[] = [];

  constructor(
    private afa: AngularFireAuth,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user$ = this.afa.user;
    this.subscriptionArr.push(
      this.user$.subscribe((user: User) => {
        this.user = user;
      })
    );
  }

  public signOut() {
    this.authService.logOut().then(() => {
      this.router.navigate(['login']);
    });
  }

  public ngOnDestroy() {
    this.subscriptionArr.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
