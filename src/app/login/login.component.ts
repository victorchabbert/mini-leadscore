import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginData } from '../authentication/authentication.model';
import 'rxjs/add/operator/map';

@Component({
  selector: 'ls-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  returnUrl: string;
  loginForm: FormGroup;
  user: LoginData = { username: '', password: '' };
  serverMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.returnUrl = localStorage.getItem('returnUrl') || '/';

    this.loginForm = this.fb.group({
      'username': [this.user.username, [
          Validators.required,
          Validators.email
        ]
      ],
      'password': [this.user.password, Validators.required]
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.user = this.loginForm.value;
    this.login();
  }

  login() {
    this.loading = true;
    this.serverMessage = '';
    this.authenticationService.login(this.user)
      .subscribe(
        data => this.router.navigate([this.returnUrl]),
        error => {
          this.loading = false;
          this.handleServerErrors(error.json());
        }
      );
  }

  handleServerErrors(data) {
    if (!this.loginForm) { return; }

    const key = data && data.message;
    if (!key) { return; }

    switch (key) {
      case 'login.user.not_found':
        return this.serverMessage = 'User does not exist.';
      case 'login.user.invalid_password':
        return this.serverMessage = 'Password does not match.';
      case 'login.validation.no_username':
        return this.serverMessage = 'Email is needed to log in.';
      case 'login.validation.no_password':
        return this.serverMessage = 'Password is needed to log in.';
      default:
        return this.serverMessage = '';
    }

  }

  checkError(field: string, type: string) {
    return this.loginForm.controls[field].hasError(type) && this.loginForm.controls[field].touched;
  }
}
