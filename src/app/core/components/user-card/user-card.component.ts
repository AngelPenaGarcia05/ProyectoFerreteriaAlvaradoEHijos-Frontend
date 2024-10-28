import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  template: `
    <div class="card">
      <div class="card-header">
        @if (userRole == 'ADMIN'){
          <img src="admin.png" alt="Imagen de usuario" class="user-image">
        }@else {
          <img src="avatar.png" alt="Imagen de usuario" class="user-image">
        }
        <div class="info">
          <h2 class="nombre">{{ userNames }}</h2>
          <span class="badge">{{ userRole }}</span>
        </div>
      </div>
      <div class="card-body">
        <p>ID: {{ userId }}</p>
      </div>
    </div>
  `,
  styles: `
    .card {
      border-radius: 8px;
      padding: 12px;
      width: 300px;
      color: white;
    }

    .card-header {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
    }

    .user-image {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }
    img{
      filter: invert();
    }

    .info {
      display: flex;
      flex-direction: column;
    }

    .nombre {
      font-size: 1rem;
      margin: 0;
      color: white;
    }

    .badge {
      background-color: var(--color-orange);
      color: white;
      padding: 2px 6px;
      border-radius: 8px;
      font-size: 0.75rem;
    }

    .card-body p {
      font-size: 0.85rem;
      margin: 0;
      color: #ffffffb3;
    }

  `
})
export class UserCardComponent {
  @Input() userNames: string = '';
  @Input() userId: number = 0;
  @Input() userRole: string = '';

}
