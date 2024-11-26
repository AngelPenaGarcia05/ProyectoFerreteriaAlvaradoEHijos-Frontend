import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  sendEmail(email: string, name: string, message: string): Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'enviar-correo', 
      { nombre: name,
        email: email,
        mensaje: message });
  }
}
