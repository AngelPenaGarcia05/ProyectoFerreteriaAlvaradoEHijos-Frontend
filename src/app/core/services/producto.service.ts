import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) {}

  getProducts(httpParams: any): Observable<Producto[]> {
    return this.http.get<Producto[]>(environment.apiUrl + 'productos',
      { params: httpParams }
    );
  }
  getProductsPaginated(inicio: number, cantidadPorPagina: number): Observable<{productos: Producto[], cantidad: number}> {
    return this.http.get<{productos: Producto[], cantidad: number}>(environment.apiUrl + 'productos/pagination', 
      { params: { inicio: inicio, cantidad: cantidadPorPagina } }
    );
  }
  getProductById(id: number): Observable<Producto> {
    return this.http.get<Producto>(environment.apiUrl + 'productos/' + id);
  }
  getProductsByCategory(categoria: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(environment.apiUrl + 'productos',
      { params: { categoria: categoria } }
    );
  }
}
