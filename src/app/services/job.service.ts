import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  getJobs(pagenumber: any, option: any) {
    return this.http.post<any>('http://localhost:3000/jobs?page=' + pagenumber, option);
  }

  addJobToFavorites(jobId: any) {
    return this.http.post<any>('http://localhost:3000/jobs/add', {
      job_offer_id: jobId
    });
  }

  deleteJobToFavorites(jobUrl: any) {
    return this.http.delete<any>('http://localhost:3000/jobs/delete?job_offer_link=' + jobUrl);
  }

}
