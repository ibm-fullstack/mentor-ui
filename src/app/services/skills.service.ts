import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchInfo } from '../home/search-info';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  private searchUrl = 'http://localhost:8080/search/skill';

  constructor(private http: HttpClient) { }

  searchSkill(info: SearchInfo): Observable<string> {
    console.log(info);
    return this.http.post<string>(this.searchUrl, info, httpOptions);
  }

}
