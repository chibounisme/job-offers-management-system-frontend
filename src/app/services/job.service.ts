import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  getJobs(pagenumber: any, option: any) {
    return this.http.post<any>('https://powerful-basin-10007.herokuapp.com/jobs?page=' + pagenumber, option);
  }

  addJobToFavorites(jobId: any) {
    return this.http.post<any>('https://powerful-basin-10007.herokuapp.com/jobs/add', {
      job_offer_id: jobId
    });
  }

  deleteJobToFavorites(jobUrl: any) {
    return this.http.delete<any>('https://powerful-basin-10007.herokuapp.com/jobs/delete?job_offer_link=' + jobUrl);
  }

}
