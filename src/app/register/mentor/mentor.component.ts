import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { MentorSignUpInfo } from '../../auth/mentor-signup-info';
import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.css']
})
export class RegisterMentorComponent implements OnInit {

  form: any = {};
  skillsList = [];
  signupInfo: MentorSignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, public ngProgress: NgProgress) { }

  ngOnInit() { }

  onAddSkill() {
    this.skillsList.push(this.form.skill);
    console.log('skills list: ' + this.skillsList);
  }

  onSubmit() {
    console.log(this.form);

    // this.skillsList = $("input").tagsinput('items');

    const starttime = Number(this.form.starttime.replace(':', ''));
    const endtime = Number(this.form.endtime.replace(':', ''));

    console.log(starttime);
    console.log(endtime);

    this.signupInfo = new MentorSignUpInfo(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password,
      this.form.years,
      starttime,
      endtime,
      this.form.fee,
      this.skillsList
      );

    this.ngProgress.start();
    this.authService.mentorSignUp(this.signupInfo).subscribe(
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
