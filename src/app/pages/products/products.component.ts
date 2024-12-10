import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../core/components/navbar/navbar.component';
import { Observable } from 'rxjs';
import { ProductoService } from '../../core/services/producto.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Producto } from '../../core/interfaces/producto';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductLoadingComponent } from '../../core/components/product-loading/product-loading.component';
import { PaginationComponent } from '../../core/components/pagination/pagination.component';
import { AuthService } from '../../core/services/auth.service';
import { ModalComponent } from '../../core/components/modal/modal.component';
import { ProveedorService } from '../../core/services/proveedor.service';
import { Proveedor } from '../../core/interfaces/proveedor';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ModalComponent, NavbarComponent, ProductLoadingComponent, PaginationComponent, AsyncPipe, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  productos!: Observable<Producto[]>;
  proveedores!: Observable<Proveedor[]>;
  productService = inject(ProductoService);
  proveedorService = inject(ProveedorService);
  toastrService = inject(ToastrService);

  cantidadProductos!: Observable<number>;
  cantidadPaginas!: number;

  userRole: string | null = null;
  authService = inject(AuthService);

  isOpen = false;

  filterForm = new FormGroup({
    nameFilter: new FormControl(''),
    categoryFilter: new FormControl('')
  });

  productoForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    precio: new FormControl('', [Validators.required, Validators.min(0)]),
    cantidad: new FormControl('', [Validators.required, Validators.min(0)]),
    descripcion: new FormControl('', Validators.required),
    imagenURL: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    proveedorID: new FormControl('', Validators.required)
  });


  constructor(private route: ActivatedRoute, private router: Router) {

  }
  ngOnInit() {
    this.proveedores = this.proveedorService.getProveedores();
    this.userRole = this.authService.getUserRole();
    this.router.navigate(['/productos'], {
      queryParams: {
        inicio: 0,
        cantidad: 10
      }, queryParamsHandling: 'merge'
    })
    this.loadProducts();
  }

  //función para la navegación entre páginas
  onPageChange(pagina: number) {
    let indice = (pagina - 1) * 10;
    this.router.navigate(['/productos'], {
      queryParams: {
        inicio: indice,
        cantidad: 10
      }, queryParamsHandling: 'merge'
    });

  }
  //función para cargar los productos y definir el numero de páginas
  loadProducts() {
    this.route.queryParams.subscribe(params => {
      this.productos = this.productService.getProducts(params);
      this.cantidadProductos = this.productService.getQuantityProducts(params);
      this.cantidadProductos.subscribe(cantidad => {
        this.cantidadPaginas = Math.ceil(cantidad / 10);
      });
    })
  }

  //función para agregar los parametros de consulta a la url según los filtros
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

    queryParams.inicio = 0;
    queryParams.cantidad = 10;

    this.router.navigate(['/productos'], { queryParams: Object.keys(queryParams).length ? queryParams : null });
  }

  //función para ver los detalles del producto
  viewProductDetails(id: number) {
    this.router.navigate(['productos', id]);
  }


  accionFormulario: string = '';
  botonLabel: string = '';
  targetProductoId: number = 0;
  @ViewChild('modal') modal!: ModalComponent;

  onSubmit(){
    switch(this.accionFormulario){
      case 'Agregar producto':
        this.guardarProducto();
        this.modal.closeModal();
        break;
      case 'Editar producto':
        this.actualizarProducto(this.targetProductoId);
        this.modal.closeModal();
        break;
      default:
        break;
    }
  }
  //funcion para guardar un producto
  guardarProducto() {
    this.productService.addProduct(
      this.productoForm.get('nombre')?.value ?? '',
      Number(this.productoForm.get('precio')?.value) || 0,
      Number(this.productoForm.get('cantidad')?.value) || 0,
      this.productoForm.get('descripcion')?.value ?? '',
      this.productoForm.get('imagenURL')?.value ?? '',
      this.productoForm.get('categoria')?.value ?? '',
      Number(this.productoForm.get('proveedorID')?.value) || 0
    ).subscribe({
      next: () => {
        this.loadProducts();
        this.toastrService.success('Producto creado');
      },
      error: (error) => {
        console.log('Error durante la creación del producto: ' + error.message);
      }
    });
  }

  actualizarProducto(id: number) {
    this.productService.updateProduct(
      id,
      this.productoForm.get('nombre')?.value ?? '',
      Number(this.productoForm.get('precio')?.value) || 0,
      Number(this.productoForm.get('cantidad')?.value) || 0,
      this.productoForm.get('descripcion')?.value ?? '',
      this.productoForm.get('imagenURL')?.value ?? '',
      this.productoForm.get('categoria')?.value ?? '',
      Number(this.productoForm.get('proveedorID')?.value) || 0
    ).subscribe({
      next: () => {
        this.loadProducts();
        this.toastrService.success('Producto actualizado');
      },
      error: (error) => {
        console.log('Error durante la actualización del producto: ' + error.message);
      }
    });
  }


  //función para editar un producto
  placeDataInForm(producto: Producto) {
    this.productoForm.patchValue({
      nombre: producto.nombre,
      precio: String(producto.precio),
      cantidad: String(producto.cantidad),
      descripcion: producto.descripcion,
      imagenURL: producto.imagenURL,
      categoria: producto.categoria,
      proveedorID: String(producto.proveedor.id)
    });
    console.log(producto);
  }
  cleanForm() {
    this.productoForm.reset();
  }
  //función para eliminar un producto
  eliminarProducto(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.loadProducts();
        this.toastrService.success('Producto eliminado');
      },
      error: (error) => {
        console.log('Error durante la eliminación del producto:' + error.message);
      }
    });
  }
}
