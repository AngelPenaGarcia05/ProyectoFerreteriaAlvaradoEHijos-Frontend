import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proveedor } from '../interfaces/proveedor';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  
  constructor(private http: HttpClient) {}
  
  getProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(environment.apiUrl + 'proveedores');
  }
  addProveedor(nombre: string, direccion: string, telefono: string, email: string, ruc: string): Observable<any> {
    return this.http.post<Proveedor>(environment.apiUrl + 'proveedores', {
      nombre,
      direccion,
      telefono,
      email,
      ruc
    });
  }
  updateProveedor(id: number, nombre: string, direccion: string, telefono: string, email: string, ruc: string): Observable<any> {
    return this.http.put<Proveedor>(environment.apiUrl + 'proveedores/' + id, {
      nombre,
      direccion,
      telefono,
      email,
      ruc
    });
  }
  deleteProveedor(id: number): Observable<any> {
    return this.http.delete(environment.apiUrl + 'proveedores/' + id);
  }
}
