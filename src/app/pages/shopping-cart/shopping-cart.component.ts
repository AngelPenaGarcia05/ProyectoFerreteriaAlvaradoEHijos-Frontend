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
import { VentaService } from '../../core/services/venta.service';
import { error } from 'console';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [ReactiveFormsModule, NavbarComponent, CurrencyPipe, PaypalButtonComponent, ModalComponent],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {

  productosEnCarrito: Carrito[];
  productos: Producto[];
  total: number;
  totalConverted: number = 0;

  ventaService = inject(VentaService);
  carritoService = inject(CarritoService);
  authService = inject(AuthService);

  dataSaleForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    postalCode: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern('^[0-9]*$')]),
    phone: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[0-9]*$')]),
    instructions: new FormControl('')
  });


  @ViewChild('modal') modal!: ModalComponent;
  
  constructor(private router: Router) {
    this.productosEnCarrito = this.carritoService.obtenerCarrito();
    this.productos = this.carritoService.obtenerProductos();
    this.total = this.carritoService.total;
    this.carritoService.convertAmount('PEN', 'USD', this.total).subscribe(convertedTotal => {
      this.totalConverted = convertedTotal;
    });
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
  limpiarCarrito(){
    this.dataSaleForm.reset();
    this.carritoService.limpiarCarrito();
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
