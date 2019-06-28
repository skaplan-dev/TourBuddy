import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { LoggedInGuard } from 'ngx-auth-firebaseui';
import { TourComponent } from './components/tour/tour.component';
import { TourDetailComponent } from './components/tour/tour-detail/tour-detail.component';
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
    component: DashboardComponent,
    canActivate: [LoggedInGuard],
    children: [
      {
        path: 'tours',
        component: TourComponent,
        outlet: 'main'
      },
      {
        path: 'tour/:id/:tourName',
        component: TourDetailComponent,
        outlet: 'main'
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
