import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  getAllUsers() {
    return this.http.get<any>('http://localhost:3000/users/profile/all');
  }
  getUserProfile() {
    return this.http.get<any>('http://localhost:3000/users/profile');
  }
  deleteUserProfile(email: string){
    return this.http.delete<any>('http://localhost:3000/users/profile/' + email);
  }

  updateProfile(profile) {
    let formData: FormData = new FormData();
    console.log(profile.file, profile.file.name);
    for (let key of Object.keys(profile)) {
      if (key != 'file')
        formData.append(key, profile[key]);
    }
    formData.append('file', profile.file, profile.file.name);
    console.log(formData.get('file'));
    return this.http.patch('http://localhost:3000/users/profile', formData);
  }
}
