import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:8080/user';
  private userTrainingUrl = 'http://localhost:8080/training/view/user';
  private mentorUrl = 'http://localhost:8080/mentor';
  private mentorTrainingUrl = 'http://localhost:8080/training/view/mentor';
  private adminUrl = 'http://localhost:8080/api/test/admin';
  private blockUserUrl = 'http://localhost:8080/user/block';
  private unblockUserUrl = 'http://localhost:8080/user/unblock';

  constructor(private http: HttpClient) { }

  getUserBoard(id: string): Observable<object> {
    const url = this.userTrainingUrl + '/' + id;
    return this.http.get(url, { responseType: 'json' });
  }

  getMentorBoard(id: string): Observable<object> {
    const url = this.mentorTrainingUrl + '/' + id;
    return this.http.get(url, { responseType: 'json' });
  }

  getAdminBoard(): Observable<object> {
    return this.http.get(this.userUrl, { responseType: 'json' });
  }

  getUser(username: string ): Observable<object> {
    const url = this.userUrl + '/' + username;
    return this.http.get(url, { responseType: 'json' });
  }

  getMentor(username: string ): Observable<object> {
    const url = this.mentorUrl + '/' + username;
    return this.http.get(url, { responseType: 'json' });
  }

  blockUser(username: string): Observable<string> {
    const info = {
      username
    }
    return this.http.post<string>(this.blockUserUrl, info, httpOptions);
  }

  unblockUser(username: string): Observable<string> {
    const info = {
      username
    }
    return this.http.post<string>(this.unblockUserUrl, info, httpOptions);
  }
}
