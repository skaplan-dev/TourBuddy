import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public registerForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private msg: NzMessageService
  ) {}

  public onSuccess(event) {
    this.router.navigate(['dashboard', { outlets: { main: 'tours' } }]);
  }

  public ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });

    this.registerForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      name: [null, [Validators.required]],
      remember: [true]
    });
  }

  public emailLogin() {
    this.authService
      .loginWithEmail(this.loginForm.value.email, this.loginForm.value.password)
      .then(
        () => {
          this.router.navigate(['dashboard', { outlets: { main: 'tours' } }]);
        },
        err => {
          this.msg.error(err);
        }
      );
  }

  public googleLogin() {
    this.authService.loginWithGoogle().then(
      () => {
        this.router.navigate(['dashboard', { outlets: { main: 'tours' } }]);
      },
      err => {
        this.msg.error(err);
      }
    );
  }

  public emailRegister() {
    this.authService
      .registerWithEmail(
        this.registerForm.value.email,
        this.registerForm.value.password
      )
      .then(
        () => {
          this.authService
            .loginWithEmail(
              this.registerForm.value.email,
              this.registerForm.value.password
            )
            .then(() => {
              this.authService.updateProfile({
                displayName: this.registerForm.value.name
              });
              this.router.navigate([
                'dashboard',
                { outlets: { main: 'tours' } }
              ]);
            });
        },
        err => {
          this.msg.error('Error Registering: ' + err);
        }
      );
  }
}
