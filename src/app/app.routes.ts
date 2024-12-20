import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { AboutComponent } from './pages/about/about.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { authGuard } from './core/guards/auth.guard';
import { ContactComponent } from './pages/contact/contact.component';
import { HistorialClienteComponent } from './pages/historial-cliente/historial-cliente.component';
import { HistorialAdminComponent } from './pages/historial-admin/historial-admin.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent},
    { path: 'contact', component: ContactComponent},
    { path: 'productos', component: ProductsComponent},
    { path: 'productos/:id', component: ProductDetailComponent },
    { path: 'shopping-cart', component: ShoppingCartComponent},
    { path: 'login', component: LoginComponent},
    { path: 'registro', component: RegisterComponent},
    { path: 'proveedores', component: ProveedoresComponent, canActivate: [authGuard]},
    { path: 'historial-cliente', component: HistorialClienteComponent},
    { path: 'historial-admin', component: HistorialAdminComponent, canActivate: [authGuard]},
];
