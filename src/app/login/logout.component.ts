import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'ls-logout',
  template: `Logging out...`,
  styles: []
})
export class LogoutComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.logout();
  }

}
