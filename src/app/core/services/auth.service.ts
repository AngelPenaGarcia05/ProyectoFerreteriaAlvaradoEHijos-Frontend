import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtResponse } from '../interfaces/jwt-response';
import { environment } from '../../../environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiAuth = environment.apiUrl + 'auth/';

  constructor(private http: HttpClient) { }

  login(email: string, contrasena: string): Observable<JwtResponse>{
    return this.http.post<JwtResponse>(this.apiAuth + 'login', { email, contrasena });
  }
  register(email: string, telefono: string, dni: string, contrasena: string, direccion: string): Observable<JwtResponse>{
    return this.http.post<JwtResponse>(this.apiAuth + 'register', { email, telefono, dni, contrasena, direccion });
  }

  getUserRole(): any {
    if (typeof window !== 'undefined' && localStorage.getItem('token')){
      const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
      if (token) {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.role;
      }
    }
    return null;
  }

  getUserId(): any {
    if (typeof window !== 'undefined' && localStorage.getItem('token')){
      const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
      if (token) {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.id;
      }
    }
    return null;
  }

  getUserNames(): any {
    if (typeof window !== 'undefined' && localStorage.getItem('token')){
      const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
      if (token) {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.nombres;
      }
    }
    return null;
  }
}
