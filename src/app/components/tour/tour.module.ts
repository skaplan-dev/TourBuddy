import { NgModule } from '@angular/core';
import { environment } from '../../../environments/environment.dev';
import { TourDetailComponent } from './tour-detail/tour-detail.component';
import { MaterialModule } from 'src/app/material/material.module';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { TourComponent } from './tour.component';
import { MapComponent } from './map/map.component';
import { RouterModule } from '@angular/router';
import { TourCreateComponent } from './tour-create/tour-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { TourEditComponent } from './tour-edit/tour-edit.component';
import { MetersToMilesPipe } from 'src/app/pipes/meters-to-miles.pipe';
import { SecondsToHoursPipe } from 'src/app/pipes/seconds-to-hours.pipe';
import { TourDateCreateComponent } from './tourDate/tour-date-create/tour-date-create.component';
import { OrderModule } from 'ngx-order-pipe';
import { TourRoutingModule } from './tour-routing.module';
import { CommonModule } from '@angular/common';
import { DrivingStatsComponent } from './driving-stats/driving-stats.component';
import { TourDetailFormComponent } from './tour-detail/tour-detail-form/tour-detail-form.component';
import { DirectionsFilterPipe } from 'src/app/pipes/directions-filter.pipe';
import { NzModule } from 'src/app/nz/nz.module';
import { BudgetsComponent } from './tour-detail/budgets/budgets.component';

@NgModule({
  declarations: [
    TourComponent,
    TourDetailComponent,
    MapComponent,
    TourCreateComponent,
    TourEditComponent,
    MetersToMilesPipe,
    SecondsToHoursPipe,
    TourDateCreateComponent,
    DrivingStatsComponent,
    TourDetailFormComponent,
    DirectionsFilterPipe,
    BudgetsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    NgxMapboxGLModule.withConfig({
      accessToken: environment.mapbox.accessToken
    }),
    FormsModule,
    ReactiveFormsModule,
    LazyLoadImageModule,
    OrderModule,
    NzModule,
    TourRoutingModule
  ],
  entryComponents: [
    TourCreateComponent,
    TourEditComponent,
    TourDateCreateComponent
  ],
  exports: [NgxMapboxGLModule]
})
export class TourModule {}
