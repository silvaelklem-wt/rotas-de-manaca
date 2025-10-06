import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HotelService } from '../../services/hotel.service';
import { Hotel } from '../../types/hotel.model';

@Component({
  selector: 'app-homes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './homes.component.html',
  styleUrl: './homes.component.css'
})
export class HomesComponent implements OnInit {
  private hotelService = inject(HotelService);
  
  hoteis: Hotel[] = [];
  carregando = true;
  erro = '';

  ngOnInit(): void {
    console.log('🏠 HomesComponent iniciado - buscando hotéis...');
    this.carregarHoteis();
  }

  carregarHoteis(): void {
    this.carregando = true;
    this.erro = '';
    
    this.hotelService.getHoteis().subscribe({
      next: (hoteis) => {
        console.log('✅ Hotéis carregados:', hoteis);
        this.hoteis = hoteis;
        this.carregando = false;
      },
      error: (error) => {
        console.error('❌ Erro ao carregar hotéis:', error);
        this.erro = 'Erro ao carregar a lista de hotéis.';
        this.carregando = false;
        
        // Mostra detalhes do erro no console
        if (error.code) {
          console.error('Código do erro:', error.code);
          console.error('Mensagem:', error.message);
        }
      }
    });
  }

	handleImageError(event: Event): void {
  		const imgElement = event.target as HTMLImageElement;
  		imgElement.src = 'data:image/svg		+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPs6VIm8gbsOjbyBjYXJyZWdhZG88L3RleHQ+Cjwvc3ZnPg==';
}

  recarregar(): void {
    this.carregarHoteis();
  }
}