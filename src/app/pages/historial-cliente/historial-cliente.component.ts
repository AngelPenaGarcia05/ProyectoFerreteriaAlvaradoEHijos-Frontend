import { Component, inject, ViewChild } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { VentaService } from '../../core/services/venta.service';
import { Venta } from '../../core/interfaces/venta';
import { NavbarComponent } from '../../core/components/navbar/navbar.component';
import { DatePipe } from '@angular/common';
import { ModalComponent } from '../../core/components/modal/modal.component';

@Component({
  selector: 'app-historial-cliente',
  standalone: true,
  imports: [NavbarComponent, ModalComponent],
  templateUrl: './historial-cliente.component.html',
  styleUrl: './historial-cliente.component.css'
})
export class HistorialClienteComponent {

  authService = inject(AuthService);
  userRole: string;
  userId: number;
  ventaService = inject(VentaService);
  ventas: Venta[] = [];
  ventaTracked!: Venta;
  @ViewChild('modalInformacion') modalInformacion!: ModalComponent;

  constructor() {
    this.userRole = this.authService.getUserRole();
    this.userId = this.authService.getUserId();
    this.ventaService.getVentas({clienteId: this.userId}).subscribe({
      next: (ventas) => {
        this.ventas = ventas;
      },
      error: (error) => {
        console.log('Error al obtener las ventas del cliente: ' + error.message);
      }
    });
  }
  openModal(venta: Venta){
    this.ventaTracked = venta;
    this.modalInformacion.openModal();
  }
}
