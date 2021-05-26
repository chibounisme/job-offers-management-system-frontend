import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from "moment";

interface User {
  token: string;
}

// la classe AuthService va envoyer les requetes http liés à tout ce qui concerne l'authentification
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  // standard login
  login(email: string, password: string) {
    return this.http.post<User>('http://localhost:3000/auth/login', {email, password});
  }

  setSession(token) {
    const expiresAt = moment().add(1, 'hour');

    localStorage.setItem('id_token', token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }
  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  register(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/auth/register', data);
  }

}
