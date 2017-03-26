import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DashboardHomeComponent } from './dashboard-home.component';
import { ModuleWithProviders } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';

const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent,
    canActivate: [AuthenticationService],
    children: [
      { path: '', component: DashboardHomeComponent, pathMatch: 'full' },
      { path: 'contacts', component: ContactsComponent },
    ]
  },
];

export const dashboardRoutes: ModuleWithProviders = RouterModule.forChild(routes);
