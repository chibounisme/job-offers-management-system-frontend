import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getDashboardInformation() {
    return this.http.get<any>('https://powerful-basin-10007.herokuapp.com/dashboard');
  }
}
