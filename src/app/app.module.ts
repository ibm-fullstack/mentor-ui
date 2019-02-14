import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { MentorComponent } from './mentor/mentor.component';

import { DropdownDirective } from './shared/dropdown.directive';

import { httpInterceptorProviders } from './auth/auth-interceptor';
import { RegisterMentorComponent } from './register/mentor/mentor.component';
import { SearchComponent } from './search/search.component';
import { TrainingComponent } from './training/training.component';
import { ProfileComponent } from './mentor/profile/profile.component';

@NgModule({
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
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
