import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from "moment";
import { JwtHelperService } from "@auth0/angular-jwt";

interface User {
  token: string;
}

// la classe AuthService va envoyer les requetes http liés à tout ce qui concerne l'authentification
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  updateToken(token: any) {
    this.setSession(token);
  }

  constructor(private http: HttpClient) { }

  // standard login
  login(email: string, password: string) {
    return this.http.post<User>('http://localhost:3000/auth/login', { email, password });
  }

  isAdmin() {
    const helper = new JwtHelperService();
    const token = localStorage.getItem('id_token');
    if (!token) return false;
    else
      return this.isLoggedIn() && helper.decodeToken(token).email == "tazbaki1919@gmail.com"
        || helper.decodeToken(token).email == "mohamedchiboub97@gmail.com";
  }

  setSession(token) {
    const expiresAt = moment().add(1, 'hour');
    localStorage.setItem('id_token', token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  setSessionSocialMedia(token, platform) {
    this.setSession(token);
    localStorage.setItem('logged_in_social', platform);
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  logoutSocialMedia() {
    this.logout();
    localStorage.removeItem("logged_in_social");
  }

  saveLoginSocialMedia(user) {
    return this.http.post('http://localhost:3000/auth/google-login', user);
  }

  saveLoginFacebook(user) {
    return this.http.post('http://localhost:3000/auth/facebook-login', user);
  }

  getToken() {
    return localStorage.getItem('id_token');
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

  googleRegister(data) {
    return this.http.post('http://localhost:3000/auth/google-register', data);
  }

  facebookRegister(data) {
    return this.http.post('http://localhost:3000/auth/facebook-register', data);
  }

  checkEmail(email) {
    return this.http.post('http://localhost:3000/auth/check-email', { email });

  }

}
