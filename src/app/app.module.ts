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
import { OfferListComponent } from './pages/offer-list/offer-list.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    ProfileAdminComponent,
    RegisterComponent,
    Stepper3Component,
    OfferListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule ,NgSelectModule, FormsModule,BrowserAnimationsModule, SimpleNotificationsModule.forRoot(),ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
