import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
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
                <li class="navbar-item"><a routerLink="/home">INICIO</a></li>
                <li class="navbar-item"><a routerLink="/about">NOSOTROS</a></li>
                <li class="navbar-item"><a routerLink="/productos">PRODUCTOS</a></li>
                <li class="navbar-item"><a href="">CONTACTO</a></li>
                <li class="navbar-item"><a href="">INICIAR SESIÓN</a></li>
                <li class="navbar-item"><a routerLink="/shopping-cart"><img src="carrito-de-compras.png" class="navbar-carrito" height="20px" alt="Carrito de compras"></a></li>
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
export class NavbarComponent {
    @ViewChild('menubar') menuBar!: ElementRef;

    translateXMenu(){
        this.menuBar.nativeElement.style.transform == 'translateX(-100%)'
        ? this.menuBar.nativeElement.style.transform = 'translateX(0)' : this.menuBar.nativeElement.style.transform = 'translateX(-100%)';
    }
}
