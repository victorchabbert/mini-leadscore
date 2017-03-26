import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { dashboardRoutes } from './dashboard-routing.module';
import { ContactsModule } from './contacts/contacts.module';
import { DashboardHomeComponent } from './dashboard-home.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ContactsModule,
    dashboardRoutes,
  ],
  declarations: [DashboardComponent, DashboardHomeComponent],
  providers: [
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
