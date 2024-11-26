import { Component, inject, ViewChild, viewChild } from '@angular/core';
import { NavbarComponent } from '../../core/components/navbar/navbar.component';
import { Producto } from '../../core/interfaces/producto';
import { Carrito } from '../../core/interfaces/carrito';
import { CarritoService } from '../../core/services/carrito.service';
import { CurrencyPipe } from '@angular/common';
import { PaypalButtonComponent } from '../../core/components/paypal-button/paypal-button.component';
import { ModalComponent } from '../../core/components/modal/modal.component';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [NavbarComponent, CurrencyPipe, PaypalButtonComponent, ModalComponent],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {

  productosEnCarrito: Carrito[];
  productos: Producto[];
  total: number;

  carritoService = inject(CarritoService);
  authService = inject(AuthService);


  @ViewChild('modal') modal!: ModalComponent;
  
  constructor(private router: Router) {
    this.productosEnCarrito = this.carritoService.obtenerCarrito();
    this.productos = this.carritoService.obtenerProductos();
    this.total = this.carritoService.total;
  }

  cargarCarrito() {
    this.productosEnCarrito = this.carritoService.obtenerCarrito();
    this.productos = this.carritoService.obtenerProductos();
    this.total = this.carritoService.total;
  }

  agregarProducto(producto: Producto, cantidad: number) {
    this.carritoService.agregarProducto(producto, cantidad);
    this.cargarCarrito();
  }

  decrementar(producto: Producto) {
    this.carritoService.decrementarCantidad(producto);
    this.cargarCarrito();
  }
  aumentar(producto: Producto) {
    this.carritoService.aumentarCantidad(producto);
    this.cargarCarrito();
  }
  eliminarProducto(Producto:Producto){
    this.carritoService.removerProducto(Producto);
    this.cargarCarrito();
  }
  confimarPago(){
    if(this.authService.getUserRole()){
      this.modal.openModal();
    }else{
      this.router.navigate(['/login']);
    }
  }

}
