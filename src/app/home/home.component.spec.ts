import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserXhr, HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './../app.component';
import { LoginComponent } from './../login/login.component';
import { UserComponent } from './../user/user.component';
import { RegisterComponent } from './../register/register.component';
import { HomeComponent } from './../home/home.component';
import { AdminComponent } from './../admin/admin.component';
import { MentorComponent } from './../mentor/mentor.component';

import { DropdownDirective } from './../shared/dropdown.directive';
import { NgbdProgressbarShowvalue } from './../user/user.component';

import { httpInterceptorProviders } from './../auth/auth-interceptor';
import { RegisterMentorComponent } from './../register/mentor/mentor.component';
import { SearchComponent } from './../search/search.component';
import { TrainingComponent } from './../training/training.component';
import { ProfileComponent } from './../mentor/profile/profile.component';
import { NgProgressModule, NgProgressBrowserXhr } from 'ngx-progressbar';
import { MatTableModule } from  '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, MatButtonModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatRippleModule } from '@angular/material';
import { MatSortModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StarRatingModule } from 'angular-star-rating';

import {APP_BASE_HREF} from '@angular/common';

fdescribe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        LoginComponent,
        UserComponent,
        RegisterComponent,
        HomeComponent,
        AdminComponent,
        MentorComponent,
        DropdownDirective,
        RegisterMentorComponent,
        SearchComponent,
        TrainingComponent,
        ProfileComponent,
        NgbdProgressbarShowvalue
       ],
      imports : [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        HttpModule,
        NgProgressModule,
        MatTableModule,
        MatCardModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        MatSortModule,
        NgbModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatRippleModule,
        MatSelectModule,
        StarRatingModule.forRoot()
      ],
      providers: [{provide: APP_BASE_HREF, useValue : '/' }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have form property', () => {
    expect(component.form).toBeTruthy();
  });
  it('should have default start time of 2:00PM', () => {
    expect(component.form.starttime).toEqual('14:00');
  });
  it('should have default end time of 4:00PM', () => {
    expect(component.form.endtime).toEqual('16:00');
  });
});
