import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
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
  getQuantityProducts(httpParams: any): Observable<number>{
    return this.http.get<number>(environment.apiUrl + 'productos/cantidad', { params: httpParams });
  }
  getProductById(id: number): Observable<Producto> {
    return this.http.get<Producto>(environment.apiUrl + 'productos/' + id);
  }
  getProductsByCategory(categoria: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(environment.apiUrl + 'productos',
      { params: { categoria: categoria } }
    );
  }
  addProduct(nombre: string, precio: number, cantidad: number, descripcion: string, imagenURL: string, categoria: string, proveedorID: number): Observable<any> {
    return this.http.post<Producto>(environment.apiUrl + 'productos', {
      nombre,
      precio,
      cantidad,
      descripcion,
      imagenURL,
      categoria,
      proveedorID
    });
  }
  updateProduct(id: number, nombre: string, precio: number, cantidad: number, descripcion: string, imagenURL: string, categoria: string, proveedorID: number): Observable<any> {
    return this.http.put<Producto>(environment.apiUrl + 'productos/' + id, {
      nombre,
      precio,
      cantidad,
      descripcion,
      imagenURL,
      categoria,
      proveedorID
    });
  }
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(environment.apiUrl + 'productos/' + id);
  }
}
