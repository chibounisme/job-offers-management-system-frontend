import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// la classe AuthService va envoyer les requetes http liés à tout ce qui concerne l'authentification
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login() {

  }

  register(data: any): Observable<any> {
    console.log(data);
    return this.http.post('http://localhost:3000/auth/register', data);
  }

}
