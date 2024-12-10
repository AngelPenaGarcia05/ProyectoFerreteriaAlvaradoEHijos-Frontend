import { Component, inject, ViewChild } from '@angular/core';
import { Venta } from '../../core/interfaces/venta';
import { VentaService } from '../../core/services/venta.service';
import { ModalComponent } from '../../core/components/modal/modal.component';
import { NavbarComponent } from '../../core/components/navbar/navbar.component';

@Component({
  selector: 'app-historial-admin',
  standalone: true,
  imports: [ModalComponent, NavbarComponent],
  templateUrl: './historial-admin.component.html',
  styleUrl: './historial-admin.component.css'
})
export class HistorialAdminComponent {
  ventas: Venta[] = [];
  ventaService = inject(VentaService);
  ventaTracked!: Venta;
  @ViewChild('modalInformacion') modalInformacion!: ModalComponent;
  @ViewChild('modalAtendido') modalAtendido!: ModalComponent;

  constructor() {
    this.ventaService.getVentas({}).subscribe({
      next: (ventas) => {
        this.ventas = ventas;
      },
      error: (error) => {
        console.log('Error al obtener las ventas: ' + error.message);
      }
    });
  }
  openModal(venta: Venta){
    this.ventaTracked = venta;
    this.modalInformacion.openModal();
  }
  openModalAtendido(venta: Venta){
    this.ventaTracked = venta;
    this.modalAtendido.openModal();
  }
  marcarComoAtendido(venta: Venta){
    this.ventaService.updateVenta(venta.id).subscribe({
      next: (response) => {
        this.ventaService.getVentas({}).subscribe({
          next: (ventas) => {
            this.ventas = ventas;
          },
          error: (error) => {
            console.log('Error al obtener las ventas: ' + error.message);
          }
        });
      },
      error: (error) => {
        console.log('Error al actualizar la venta: ' + error.message);
      }
    });
  }
}
