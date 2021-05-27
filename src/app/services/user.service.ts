import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserProfile() {
    return this.http.get<any>('http://localhost:3000/users/profile');
  }
  updateProfile(profile) {
    return this.http.patch<any>('http://localhost:3000/users/profile', profile);
  }
}
