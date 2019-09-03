import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { NzModule } from 'src/app/nz/nz.module';
import { RouterModule } from '@angular/router';
import { AvatarComponent } from '../avatar/avatar.component';
import { AboutComponent } from '../about/about.component';
import { ContactsComponent } from '../contacts/contacts.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ProfileComponent } from '../profile/profile.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    AvatarComponent,
    ContactsComponent,
    AboutComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzModule,
    RouterModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule {}
