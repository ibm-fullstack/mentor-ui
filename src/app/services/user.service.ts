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

  constructor(private http: HttpClient) { }

  getUserBoard(id: string): Observable<object> {
    const url = this.userTrainingUrl + '/' + id;
    return this.http.get(url, { responseType: 'json' });
  }

  getMentorBoard(id: string): Observable<object> {
    const url = this.mentorTrainingUrl + '/' + id;
    return this.http.get(url, { responseType: 'json' });
  }

  getAdminBoard(): Observable<string> {
    return this.http.get(this.adminUrl, { responseType: 'text' });
  }

  getUser(username: string ): Observable<object> {
    const url = this.userUrl + '/' + username;
    return this.http.get(url, { responseType: 'json' });
  }

  getMentor(username: string ): Observable<object> {
    const url = this.mentorUrl + '/' + username;
    return this.http.get(url, { responseType: 'json' });
  }
}
