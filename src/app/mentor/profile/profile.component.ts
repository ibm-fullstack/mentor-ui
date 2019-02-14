import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  mentor: any;
  username: string;
  errorMessage: string;

  constructor(private _location: Location, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.username = this.route.snapshot.params['username'];
    this.userService.getMentor(this.username).subscribe(
      data => {
        this.mentor = data;
        console.log(data);
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
  }

  backClicked() {
    this._location.back();
  }

}
