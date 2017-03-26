import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './login/logout.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule' },
];

export const routing = RouterModule.forRoot(routes);
