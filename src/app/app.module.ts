import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileAdminComponent } from './pages/profile-admin/profile-admin.component';
import { RegisterComponent } from './pages/register/register.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Stepper3Component } from './stepper3/stepper3.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JoboffersComponent } from './pages/joboffers/joboffers.component';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { AuthInterceptor } from './services/authintercepter';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { TooltipModule } from 'ng2-tooltip-directive';
import { SafeUrlPipe } from './services/safe-url';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { SocialLoginModule, SocialAuthServiceConfig, FacebookLoginProvider } from 'angularx-social-login';
import {
  GoogleLoginProvider
} from 'angularx-social-login';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    ProfileAdminComponent,
    RegisterComponent,
    Stepper3Component,
    
    JoboffersComponent,
    DashboardAdminComponent,
    SafeUrlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    LoadingBarRouterModule,
    MatProgressBarModule,
    LoadingBarModule,
    TooltipModule,
    SocialLoginModule,
    TooltipModule,
    NgxChartsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }, {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '552875118448-d5av82j4f09b2rtjhns1pb0h9tvoptrp.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('176184177664726')
          }
        ]
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
