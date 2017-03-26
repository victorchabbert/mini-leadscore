import { Component } from '@angular/core';
import { AuthenticationService } from './authentication/authentication.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'ls-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  constructor(private authService: AuthenticationService) {
    this.authService.init({
      apiBase: environment.API_BASE,
      apiPath: environment.API_PATH,
      loginPath: 'login',
      loginRedirect: 'login',
      loginReturnUrlStorageKey: 'returnUrl',
      logoutPath: 'logout',
      validateTokenPath: 'login/details',
    });
  }
}
