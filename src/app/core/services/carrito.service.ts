import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto';
import { Carrito } from '../interfaces/carrito';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  carrito: Carrito[];
  total: number;

  constructor() {
    this.carrito = [];
    this.total = 0;
  }

  calcularTotal() {
    this.total = this.carrito.reduce((total, carrito) => total + carrito.producto.precio * carrito.cantidad, 0);
  }

  obtenerProductos() {
    return this.carrito.map(carrito => carrito.producto);
  }

  agregarProducto(producto: Producto, cantidad: number) {
    this.carrito.push({ producto, cantidad });
  }

  removerProducto(producto: Producto) {
    this.carrito = this.carrito.filter(carrito => carrito.producto.id !== producto.id);
  }
}
