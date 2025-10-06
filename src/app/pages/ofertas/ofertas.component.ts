import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ofertas',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>🔥 Ofertas Especiais</h1>
      <p>Página em desenvolvimento - Em breve ofertas exclusivas!</p>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
      text-align: center;
    }
    h1 {
      color: #2c3e50;
      margin-bottom: 20px;
    }
  `]
})
export class OfertasComponent {}