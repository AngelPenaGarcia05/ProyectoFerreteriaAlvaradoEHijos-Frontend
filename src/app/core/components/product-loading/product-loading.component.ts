import { Component } from '@angular/core';

@Component({
  selector: 'app-product-loading',
  standalone: true,
  imports: [],
  template: `
    <div class="product-card-skeleton">
      <div class="skeleton-image"></div>
      <div class="skeleton-details">
        <div class="skeleton-title"></div>
        <div class="skeleton-price"></div>
        <div class="skeleton-description"></div>
        <div class="skeleton-button"></div>
      </div>
  </div>
  `,
  styles: [`
    .product-card-skeleton {
      display: flex;
      flex-direction: column;
      width: 210px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      background-color: #fff;
    }

    .skeleton-image {
      width: 100%;
      height: 180px;
      background-color: #e0e0e0;
      border-radius: 4px;
      margin-bottom: 16px;
      animation: pulse 1.5s infinite ease-in-out;
    }

    .skeleton-details {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .skeleton-title {
      width: 70%;
      height: 20px;
      background-color: #e0e0e0;
      border-radius: 4px;
      animation: pulse 1.5s infinite ease-in-out;
    }

    .skeleton-price {
      width: 40%;
      height: 20px;
      background-color: #e0e0e0;
      border-radius: 4px;
      animation: pulse 1.5s infinite ease-in-out;
    }

    .skeleton-description {
      width: 100%;
      height: 60px;
      background-color: #e0e0e0;
      border-radius: 4px;
      animation: pulse 1.5s infinite ease-in-out;
    }

    .skeleton-button {
      width: 50%;
      height: 36px;
      background-color: #e0e0e0;
      border-radius: 20px;
      margin-top: 12px;
      animation: pulse 1.5s infinite ease-in-out;
    }
    @keyframes pulse {
      0% {
        background-color: #e0e0e0;
      }
      50% {
        background-color: #f0f0f0;
      }
      100% {
        background-color: #e0e0e0;
      }
    }

  `]
})
export class ProductLoadingComponent {

}
