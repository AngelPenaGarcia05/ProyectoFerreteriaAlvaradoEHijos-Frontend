import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../core/components/navbar/navbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../../core/interfaces/producto';
import { ProductoService } from '../../core/services/producto.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ProductLoadingComponent } from '../../core/components/product-loading/product-loading.component';
import { CarritoService } from '../../core/services/carrito.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [NavbarComponent, ProductLoadingComponent, AsyncPipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  producto$!: Observable<Producto>;
  productosRelacionados!: Observable<Producto[]>;
  productService = inject(ProductoService);
  carritoService = inject(CarritoService);


  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.producto$ = this.productService.getProductById(params['id']);
      this.producto$.subscribe(producto => {
        this.productosRelacionados = this.productService.getProductsByCategory(producto.categoria);
      })
    })
  }
  viewProductDetails(id: number){
    this.router.navigate(['productos', id]);
  }
  agregarAlCarrito(producto: Producto | null, cantidad: number) {
    if (!producto) return;
    this.carritoService.agregarProducto(producto, cantidad);
  }
}
