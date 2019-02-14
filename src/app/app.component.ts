import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './auth/token-storage.service';
import { UserService } from './services/user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[];
  private authority: string;
  private user: any;
  private mentor: any;
  errorMessage: string;

  constructor(private tokenStorage: TokenStorageService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        } else if (role === 'ROLE_MENTOR') {
          this.authority = 'mentor';
          this.userService.getMentor(this.tokenStorage.getUsername()).subscribe(
            data => {
              this.mentor = data;
              console.log(data);
            },
            error => {
              this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
            }
          );
          return false;
        }
        this.authority = 'user';
        this.userService.getUser(this.tokenStorage.getUsername()).subscribe(
          data => {
            this.user = data;
            console.log(data);
          },
          error => {
            this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
          }
        );
        return true;
      });
    }
  }

  logout() {
    this.tokenStorage.signOut();
    this.router.navigate(['home'])
    window.location.reload();
  }
}
