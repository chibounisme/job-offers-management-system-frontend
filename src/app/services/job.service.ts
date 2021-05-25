import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }
  getJobs(pagenumber: any, option: any) {
    console.log('sending ' + pagenumber);
    return this.http.post<any>('http://localhost:3000/jobs?page=' + pagenumber, option);
  }
}
