import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-paypal-button',
  standalone: true,
  imports: [],
  template: `<div id="paypal-button-container"></div>`
})
export class PaypalButtonComponent implements OnInit {
  @Input() amount!: number;
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
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
    (window as any).paypal.Buttons({
      style: {
        shape: 'pill'
      },
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: this.amount.toString()
            }
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          console.log('Transacción completada por ' + details.payer.name.given_name);
        });
      }
    }).render('#paypal-button-container');
  }
}
