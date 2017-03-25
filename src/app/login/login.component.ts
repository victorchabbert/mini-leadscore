import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginUser } from './LoginUser';

@Component({
  selector: 'ls-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loading = false;
  returnUrl: string;
  loginForm: FormGroup;
  user = new LoginUser('', '');

  formErrors = {
    'email': '',
    'password': ''
  };

  validationMessages = {
    'email': {
      'required': 'Email is required.',
      'email': 'Must be a valid email.'
    },
    'password': {
      'required': 'Password is required.'
    }
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.loginForm = this.fb.group({
      'email': [this.user.email, [
          Validators.required,
          Validators.email
        ]
      ],
      'password': [this.user.password, Validators.required]
    });

    this.loginForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onSubmit() {
    this.user = this.loginForm.value;
    this.login();
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.user.email, this.user.password)
      .subscribe(
        data => this.router.navigate([this.returnUrl]),
        error => {
          this.loading = false;
          console.error('login', error);
        }
      );
  }

  onValueChanged(data?: any) {
    if (!this.loginForm) { return; }
    const form = this.loginForm;

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  checkError(field: string, type: string) {
    return this.loginForm.controls[field].hasError(type) && this.loginForm.controls[field].touched;
  }
}
