import { Injectable } from '@angular/core';
import { ActivatedRoute, CanActivate, Router } from '@angular/router';
import {
  Headers,
  Http,
  Response,
  Request,
  RequestMethod,
  RequestOptions,
} from '@angular/http';

import { AuthData, LoginData, TokenOptions } from './authentication.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';

@Injectable()
export class AuthenticationService implements CanActivate {

  private _options: TokenOptions;
  private _currentAuthData: AuthData;


  get options(): TokenOptions {
    return this._options;
  }

  get currentAuthData(): AuthData {
    return this._currentAuthData;
  }

  constructor(
    private http: Http,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  loggedIn(): boolean {
    return !!this._currentAuthData;
  }

  canActivate(): boolean {
    if (this.loggedIn()) {
      return true;
    }

    if (this._options.loginReturnUrlStorageKey) {
      localStorage.setItem(
        this._options.loginReturnUrlStorageKey,
        window.location.pathname + window.location.search
      );
    }

    if (this._options.loginRedirect) {
      this.router.navigate([this._options.loginRedirect]);
    }

    return false;
  }

  init(options?: TokenOptions) {
    const defaultOptions: TokenOptions = {
      apiPath: null,
      apiBase: null,

      loginPath: 'login',
      loginRedirect: null,
      loginReturnUrlStorageKey: null,

      logoutPath: 'logout',
      validateTokenPath: null,

      globalOptions: {
        headers: {
          'Content-Type': 'application/json',
        }
      },
    };

    this._options = Object.assign(defaultOptions, options);
    this.loadSavedAuthData();
  }

  login(loginData: LoginData): Observable<Response> {
    const obs = this.post(this._options.loginPath, JSON.stringify(loginData));
    obs.subscribe(res => {
      const data = res.json();
      this.setAuthData({
        token: data.token.authToken,
        expiry: data.token.expires,
        firebaseToken: data.firebaseAuthToken
      });
    });

    return obs;
  }

  logout(): Observable<Response> {
    const obs = this.post(this._options.logoutPath, JSON.stringify({
      authToken: this.currentAuthData.token
    }));

    obs.subscribe(res => {
      localStorage.removeItem('token');
      localStorage.removeItem('expiry');
      localStorage.removeItem('firebaseToken');

      this._currentAuthData = null;
    });

    return obs;
  }

  validateToken(): Observable<Response> {
    const obs = this.get(this.options.validateTokenPath);

    obs.subscribe(
      res => res.json(),
      error => {
        if (error.status === 401) {
          this.logout();
        }
      }
    );

    return obs;
  }

  /**
   * HTTP WRAPPERS
   */
  get(url: string, options?: Object): Observable<Response> {
    return this.request(Object.assign({
      url: `${this.getApiPath()}${url}`,
      method: RequestMethod.Get,
    }, options));
  }

  post(url: string, body: any, options?: Object): Observable<Response> {
    return this.request(Object.assign({
      url: this.getApiPath() + url,
      method: RequestMethod.Post,
      body
    }, options));
  }

  put(url: string, body: any, options?: Object): Observable<Response> {
    return this.request(Object.assign({
      url: `${this.getApiPath()}${url}`,
      method: RequestMethod.Put,
      body
    }, options));
  }

  delete(url: string, options?: Object): Observable<Response> {
    return this.request(Object.assign({
      url: `${this.getApiPath()}${url}`,
      method: RequestMethod.Delete,
    }, options));
  }

  patch(url: string, body: any, options?: Object): Observable<Response> {
    return this.request(Object.assign({
      url: `${this.getApiPath()}${url}`,
      method: RequestMethod.Patch,
      body
    }, options));
  }

  request(options: Object): Observable<Response> {
    let baseRequestOptions: RequestOptions;
    const globalHeaders = this._options.globalOptions.headers;

    if (this._currentAuthData != null) {
      Object.assign(globalHeaders, {
        'authToken': this._currentAuthData.token
      });
    }

    baseRequestOptions = new RequestOptions({
      headers: new Headers(globalHeaders)
    });

    baseRequestOptions = baseRequestOptions.merge(options);

    const response = this.http.request(new Request(baseRequestOptions)).share();

    return response;
  }

  private loadSavedAuthData(): void {
    this.getAuthDataFromStorage();

    if (this.currentAuthData) {
      this.validateToken();
    }
  }

  private getAuthDataFromStorage(): void {
    const authData: AuthData = {
      token: localStorage.getItem('token'),
      expiry: localStorage.getItem('expiry'),
      firebaseToken: localStorage.getItem('firebaseToken'),
    };

    if (this.validateAuthData(authData)) {
      this._currentAuthData = authData;
    }
  }

  private setAuthData(authData: AuthData): void {
    if (this.validateAuthData(authData)) {

      this._currentAuthData = authData;

      localStorage.setItem('token', authData.token);
      localStorage.setItem('expiry', authData.expiry);
      localStorage.setItem('firebaseToken', authData.firebaseToken);
    }
  }

  private validateAuthData(authData: AuthData): boolean {

    if (
      authData.token != null &&
      authData.expiry != null &&
      authData.firebaseToken != null
    ) {
      if (this._currentAuthData != null) {
        return authData.expiry >= this._currentAuthData.expiry;
      }
      return true;
    }

    return false;
  }

  private getApiPath(): string {
    let apiPath = '';

    if (this._options.apiBase != null) {
      apiPath += this._options.apiBase + '/';
    }

    if (this._options.apiPath != null) {
      apiPath += this._options.apiPath + '/';
    }

    return apiPath;
  }
}
