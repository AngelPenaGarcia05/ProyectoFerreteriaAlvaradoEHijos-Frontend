import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Producto } from '../interfaces/producto';
import { Carrito } from '../interfaces/carrito';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  carrito: Carrito[];
  total: number;
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.total = 0;
    this.carrito = [];
    if (this.isBrowser) {
      const storedCarrito = localStorage.getItem('carrito');
      this.carrito = storedCarrito ? JSON.parse(storedCarrito) : [];
    }
  }

  calcularTotal() {
    this.total = this.carrito.reduce((total, carrito) => total + carrito.producto.precio * carrito.cantidad, 0);
  }
  obtenerCarrito() {
    this.calcularTotal();
    return this.carrito;
  }
  obtenerProductos() {
    return this.carrito.map(carrito => carrito.producto);
  }

  agregarProducto(producto: Producto, cantidad: number) {
    //si el producto ya existe en el carrito, suma la cantidad
    if (this.carrito.some(carrito => carrito.producto.id === producto.id)) {
      const index = this.carrito.findIndex(carrito => carrito.producto.id === producto.id);
      this.carrito[index].cantidad += cantidad;
    } else {
      this.carrito.push({ producto, cantidad });
    }
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }
  decrementarCantidad(producto: Producto) {
    //si el producto existe en el carrito, decrementa la cantidad
    if (this.carrito.some(carrito => carrito.producto.id === producto.id)) {
      const index = this.carrito.findIndex(carrito => carrito.producto.id === producto.id);
      if(this.carrito[index].cantidad === 1){
        return;
      }
      this.carrito[index].cantidad--;
    }
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }
  aumentarCantidad(producto: Producto) {
    //si el producto existe en el carrito, aumenta la cantidad
    if (this.carrito.some(carrito => carrito.producto.id === producto.id)) {
      const index = this.carrito.findIndex(carrito => carrito.producto.id === producto.id);
      this.carrito[index].cantidad++;
    }
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }
  removerProducto(producto: Producto) {
    this.carrito = this.carrito.filter(carrito => carrito.producto.id !== producto.id);
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }
}
