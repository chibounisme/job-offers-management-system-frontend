import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }
  GetJobs(pagenumber: any,option:any) {
    return this.http.post('http://localhost:3000/jobs?page='+pagenumber, option);
  }
}
