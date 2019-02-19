import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { UserSignUpInfo } from '../auth/user-signup-info';

import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  signupInfo: UserSignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, public ngProgress: NgProgress) { }

  ngOnInit() { }

  onSubmit() {
    console.log(this.form);

    this.signupInfo = new UserSignUpInfo(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password);

    this.ngProgress.start();
    this.authService.userSignUp(this.signupInfo).subscribe(
      data => {
        this.ngProgress.done();
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
