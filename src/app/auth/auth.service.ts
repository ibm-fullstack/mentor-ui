import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtResponse } from './jwt-response';
import { AuthLoginInfo } from './login-info';
import { UserSignUpInfo } from './user-signup-info';
import { MentorSignUpInfo } from './mentor-signup-info';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8080/api/auth/signin';
  private userSignupUrl = 'http://localhost:8080/api/auth/signup';
  private mentorSignupUrl = 'http://localhost:8080/api/auth/mentor/signup';

  constructor(private http: HttpClient) {
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  userSignUp(info: UserSignUpInfo): Observable<string> {
    return this.http.post<string>(this.userSignupUrl, info, httpOptions);
  }

  mentorSignUp(info: MentorSignUpInfo): Observable<string> {
    return this.http.post<string>(this.mentorSignupUrl, info, httpOptions);
  }
}
