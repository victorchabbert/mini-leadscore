import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthenticationService {

  constructor(private http: Http) { }

  login(username: string, password: string) {
    localStorage.setItem('currentUser', JSON.stringify(username));

    return Observable.of({ username });
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
