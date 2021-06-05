import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  getAllUsers() {
    return this.http.get<any>('https://powerful-basin-10007.herokuapp.com/users/profile/all');
  }
  getUserProfile() {
    return this.http.get<any>('https://powerful-basin-10007.herokuapp.com/users/profile');
  }
  deleteUserProfile(email: string) {
    return this.http.delete<any>('https://powerful-basin-10007.herokuapp.com/users/profile/' + email);
  }

  updateProfile(profile) {
    let formData: FormData = new FormData();
    for (let key of Object.keys(profile)) {
      if (key != 'file')
        formData.append(key, profile[key]);
    }
    if (profile.file)
      formData.append('file', profile.file, profile.file.name);
    return this.http.patch('https://powerful-basin-10007.herokuapp.com/users/profile', formData);
  }
}
