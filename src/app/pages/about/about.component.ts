import { Component } from '@angular/core';
import { NavbarComponent } from '../../core/components/navbar/navbar.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <section class="sobre-nosotros">
      <div class="texto">
        <h1>Sobre Nosotros</h1>
        <p>
          La empresa alvarado e hijos nacio por una la idea de tener algo propio y brindar productos relacionados con el rubro de construcción , fue con mucho esfuerzo que se alquilo el local pero aun así se siguo hasta el día de hoy, ese persistencia y coraje formaron nuestro valor y permitieron posicionar la ferretería en la comunidad.
        </p>
        <p>
          Nuestro compromiso es garantizar la satisfacción de nuestros clientes a través de un servicio eficiente, una excelente relación calidad-precio y un equipo capacitado para asesorarte en cada paso.
        </p>
      </div>
      <div class="imagen">
        <img src="image-sobre-nosotros.jpg" alt="Imagen de la empresa">
      </div>
    </section>
  `,
  styles: [`

    .sobre-nosotros {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
      animation: moveup 1s ease;
    }

    .texto {
      flex: 1;
      padding-right: 20px;
    }

    .texto h1 {
      font-size: 2.5rem;
      margin-bottom: 20px;
      color: #333;
    }

    .texto p {
      font-size: 1.2rem;
      margin-bottom: 20px;
      color: #666;
    }

    .imagen {
      flex: 1;
      display: flex;
      justify-content: center;
      padding-left: 20px;
    }

    .imagen img {
      max-width: 100%;
      height: auto;
      border-radius: 15px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 768px) {
      .sobre-nosotros {
        flex-direction: column;
        text-align: center;
      }
      
      .texto, .imagen {
        padding: 0;
      }
      
      .texto {
        margin-bottom: 20px;
      }

      .texto h1 {
        font-size: 2rem;
      }

      .texto p {
        font-size: 1rem;
      }
    }

  `]
})
export class AboutComponent {

}
