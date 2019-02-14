import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TrainingInfo } from '../training/training-info';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private proposeUrl = 'http://localhost:8080/training/propose';
  private updateStatusUrl = 'http://localhost:8080/training/updatestatus';

  constructor(private http: HttpClient) { }

  propose(info: TrainingInfo): Observable<string> {
    console.log(info);
    return this.http.post<string>(this.proposeUrl, info, httpOptions);
  }

  updateStatus(id: number, status: string): Observable<string> {
    const info = {
      id, status
    }
    return this.http.post<string>(this.updateStatusUrl, info, httpOptions);
  }
}
