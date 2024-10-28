import { Component, ElementRef, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserCardComponent } from '../user-card/user-card.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, UserCardComponent],
  template: `
    <header>
        <nav class="navbar-container">
            <div class="navbar-logo">
                <!--logo de la ferreteria-->
                <img src="logo-removebg-preview.png" alt="Alvarado e Hijos">
            </div>
            <div class="navbar-toggle" (click)="translateXMenu()">
                <img src="menu-hamburguesa.png" alt="Menú">
            </div>
            <ul #menubar class="navbar-list">
                @if(!userRole || userRole != 'ADMIN'){
                    <li class="navbar-item"><a routerLink="/home">INICIO</a></li>
                    <li class="navbar-item"><a routerLink="/about">NOSOTROS</a></li>
                }
                <li class="navbar-item"><a routerLink="/productos">PRODUCTOS</a></li>
                @if(userRole == 'ADMIN'){
                    <li class="navbar-item"><a routerLink="/proveedores">PROVEEDORES</a></li>
                }
                @if(!userRole){
                    <li class="navbar-item"><a href="">CONTACTO</a></li>
                }
                @if (userRole == 'ADMIN' || userRole == 'USER'){
                    <li class="navbar-item"><a>
                        <app-user-card [userNames]="userNames" [userId]="userId" [userRole]="userRole"></app-user-card>
                    </a></li>
                }@else {
                    <li class="navbar-item"><a routerLink="/login">INICIAR SESIÓN</a></li>
                }
                <li class="navbar-item"><a routerLink="/shopping-cart"><img src="carrito-de-compras.png" class="navbar-carrito" height="20px" alt="Carrito de compras"></a></li>
                @if (userRole){
                    <li class="navbar-item"><a (click)="cerrarSesion()">CERRAR SESIÓN</a></li>
                }
                <img class="x-image" src="x-image.png" (click)="translateXMenu()" alt="Cerrar menú">
            </ul>
        </nav>
        <div class="header-img">
            <img src="https://hermanosguill.com/wp-content/uploads/2022/11/herramientas-manuales-ferreteria.jpg" alt="Imagen del header">
        </div>
        <div class="navabar-contact-container">
            <a href=""><img src="correo.png" alt=""></a>
            <a href=""><img src="facebook.png" alt=""></a>
            <a href=""><img src="instagram.png" alt=""></a>
            <a href=""><img src="llamada-telefonica.png" alt=""></a>
            <span>+51 971 135 997</span>
        </div>
        <div class="triangle-header-decorator"></div>
    </header>
  `,
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
    authService = inject(AuthService);
    userRole: string | null = null;
    userId: number = 0;
    userNames: string = '';
    constructor(private router: Router) {
    }
    
    ngOnInit(): void {
        this.userRole = this.authService.getUserRole();
        this.userId = this.authService.getUserId();
        this.userNames = this.authService.getUserNames();
    }
    @ViewChild('menubar') menuBar!: ElementRef;

    

    translateXMenu(){
        this.menuBar.nativeElement.style.transform == 'translateX(-100%)'
        ? this.menuBar.nativeElement.style.transform = 'translateX(0)' : this.menuBar.nativeElement.style.transform = 'translateX(-100%)';
    }
    cerrarSesion(){
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }
    
}
