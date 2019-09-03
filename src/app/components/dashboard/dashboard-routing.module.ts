import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from 'ngx-auth-firebaseui';
import { ContactsComponent } from '../contacts/contacts.component';
import { AboutComponent } from '../about/about.component';
import { ProfileComponent } from '../profile/profile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tours',
    pathMatch: 'full'
  },
  {
    path: 'tours',
    outlet: 'main',
    loadChildren: () => import('../tour/tour.module').then(m => m.TourModule)
  },
  {
    path: 'contacts',
    outlet: 'main',
    component: ContactsComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'about',
    outlet: 'main',
    component: AboutComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'profile',
    outlet: 'main',
    component: ProfileComponent,
    canActivate: [LoggedInGuard]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
