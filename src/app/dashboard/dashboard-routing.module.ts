import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DashboardHomeComponent } from './dashboard-home.component';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from '../authentication/auth.guard';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardHomeComponent, pathMatch: 'full' },
      { path: 'contacts', component: ContactsComponent },
    ]
  },
];

export const dashboardRoutes: ModuleWithProviders = RouterModule.forChild(routes);
