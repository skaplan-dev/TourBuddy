import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LoggedInGuard } from 'ngx-auth-firebaseui';
import { DashboardComponent } from './components/dashboard/dashboard.component';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard/(main:tours)'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    canActivate: [LoggedInGuard],
    component: DashboardComponent,
    loadChildren: () =>
      import('./components/dashboard/dashboard.module').then(
        m => m.DashboardModule
      )
  },
  {
    path: '**',
    redirectTo: ''
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
