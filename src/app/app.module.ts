import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { routing } from './app-routing.module';
import { AuthenticationService } from './authentication/authentication.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { LogoutComponent } from './login/logout.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    DashboardModule,
    routing
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
  ],
  providers: [
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
