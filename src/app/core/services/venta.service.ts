import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venta } from '../interfaces/venta';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor(private http: HttpClient) { }

  // Obtener todas las ventas
  getVentas(): Observable<Venta[]> {
    return this.http.get<Venta[]>(`${environment.apiUrl}ventas`);
  }

  // Obtener una venta por ID
  getVentaById(id: number): Observable<Venta> {
    return this.http.get<Venta>(`${environment.apiUrl}ventas/${id}`);
  }

  // Crear una nueva venta
  addVenta(
    tipoPago: string,
    estado: string,
    fecha: string,
    clienteID: number,
    detallesVenta: { productoID: number; cantidad: number }[]
  ): Observable<any> {
    return this.http.post<Venta>(`${environment.apiUrl}ventas`, {
      tipoPago,
      estado,
      fecha,
      clienteID,
      detallesVenta
    });
  }

  // Actualizar una venta existente
  updateVenta(
    id: number,
    tipoPago: string,
    estado: string,
    fecha: string,
    clienteID: number,
    detallesVenta: { productoID: number; cantidad: number }[]
  ): Observable<any> {
    return this.http.put<Venta>(`${environment.apiUrl}ventas/${id}`, {
      tipoPago,
      estado,
      fecha,
      clienteID,
      detallesVenta
    });
  }

  // Eliminar una venta
  deleteVenta(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}ventas/${id}`);
  }
}
