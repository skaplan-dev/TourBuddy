import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { TourComponent } from './tour.component';
import { TourDetailComponent } from './tour-detail/tour-detail.component';
const routes: Routes = [
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
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TourRoutingModule {}
