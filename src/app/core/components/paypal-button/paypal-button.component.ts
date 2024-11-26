import { isPlatformBrowser } from '@angular/common';
import { Component, inject, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { VentaService } from '../../services/venta.service';
import { CarritoService } from '../../services/carrito.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-paypal-button',
  standalone: true,
  imports: [],
  template: `<div id="paypal-button-container"></div>`
})
export class PaypalButtonComponent {
  @Input() amount!: number;
  isBrowser: boolean;

  ventaService = inject(VentaService)
  carritoService = inject(CarritoService)
  authService = inject(AuthService)


  constructor(
    @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.loadPaypalScript().then(() => {
        this.renderPaypalButton();
      });
    }
  }

  loadPaypalScript(): Promise<void> {
    return new Promise((resolve) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = 'https://www.paypal.com/sdk/js?client-id=AQ5FvchG0MtCFo04zu4GRijF30NpJAXnvrCNoBxLieidKxsolBUET7_gSxb85QRUGnkX68pzKFkXY8_M';
      scriptElement.onload = () => resolve();
      document.body.appendChild(scriptElement);
    });
  }

  renderPaypalButton(): void {
    const carrito = this.carritoService.obtenerCarrito();
    const total = this.carritoService.total;

    (window as any).paypal.Buttons({
      style: {
        shape: 'pill'
      },
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: total.toFixed(2) // Usar el total calculado
            }
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          console.log('Transacción completada por ' + details.payer.name.given_name);

          // Crear los detalles de la venta a partir del carrito
          const detallesVenta = carrito.map(item => ({
            productoID: item.producto.id,
            cantidad: item.cantidad
          }));

          // Preparar los datos de la venta
          const ventaData = {
            tipoPago: 'PayPal',
            estado: 'Completada',
            fecha: new Date().toISOString(),
            clienteID:  this.authService.getUserId(),
            detallesVenta: detallesVenta,
          };

          // Insertar la venta utilizando VentaService
          this.ventaService.addVenta(
            ventaData.tipoPago,
            ventaData.estado,
            ventaData.fecha,
            ventaData.clienteID,
            ventaData.detallesVenta
          ).subscribe({
            next: (response) => {
              console.log('Venta registrada con éxito', response);
            },
            error: (error) => {
              console.error('Error al registrar la venta', error);
            }
          });
        });
      }
    }).render('#paypal-button-container');
  }

}
