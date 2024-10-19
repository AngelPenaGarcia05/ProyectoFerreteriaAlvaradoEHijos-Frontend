import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../core/components/navbar/navbar.component';
import { Producto } from '../../core/interfaces/producto';
import { Carrito } from '../../core/interfaces/carrito';
import { CarritoService } from '../../core/services/carrito.service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {

  productosEnCarrito: Carrito[];
  productos: Producto[];
  carritoService = inject(CarritoService);
  
  constructor() {
    this.productosEnCarrito = [];
    this.productos = [];
  }


}
