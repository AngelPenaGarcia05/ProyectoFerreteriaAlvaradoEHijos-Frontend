import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../core/components/navbar/navbar.component';
import { Observable } from 'rxjs';
import { ProductoService } from '../../core/services/producto.service';
import { AsyncPipe } from '@angular/common';
import { Producto } from '../../core/interfaces/producto';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductLoadingComponent } from '../../core/components/product-loading/product-loading.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NavbarComponent, ProductLoadingComponent, AsyncPipe, RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  productos!: Observable<Producto[]>;
  productosPaginados!: Observable<{ productos: Producto[], cantidad: number }>;
  productService = inject(ProductoService);
  
  filterForm = new FormGroup({
    nameFilter: new FormControl(''),
    categoryFilter: new FormControl('')
  });

  paginaActual: number = 1;
  cantidadPorPagina: number = 10;
  inicio: number = 0;
  cantidadPaginas: number = 0;

  constructor(private route: ActivatedRoute, private router: Router) {

  }
  ngOnInit() {
    this.loadProducts();
  }
  loadProducts() {
    this.route.queryParams.subscribe(params => {
      this.productos = this.productService.getProducts(params);
    })
  }
  loadProductsPaginated(paginaActual: number, cantidadPorPagina: number) {
    this.productosPaginados = this.productService.getProductsPaginated(paginaActual, cantidadPorPagina);
  }
  setFiltersInRoute() {
    const queryParams: any = {};
  
    const nameFilter = this.filterForm.get('nameFilter')?.value;
    const categoryFilter = this.filterForm.get('categoryFilter')?.value;
  
    if (nameFilter) {
      queryParams.nombre = nameFilter;
    }
  
    if (categoryFilter) {
      queryParams.categoria = categoryFilter;
    }
  
    this.router.navigate(['/productos'], { queryParams: Object.keys(queryParams).length ? queryParams : null });
  }

  viewProductDetails(id: number){
    this.router.navigate(['productos', id]);
  }
}
