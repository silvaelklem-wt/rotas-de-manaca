import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RoomService } from '../../services/room.service';
import { Room } from '../../types/room.model';

@Component({
  selector: 'app-detalhes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalhes.component.html',
  styleUrl: './detalhes.component.css'
})
export class DetalhesComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private roomService = inject(RoomService);
  
  quarto?: Room;
  carregando = true;
  fotoPrincipal = '';

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const quartoId = params['id'];
      this.carregarQuarto(quartoId);
    });
  }

  carregarQuarto(id: string): void {
    this.roomService.getQuartoById(id).subscribe({
      next: (quarto: Room) => {
        this.quarto = quarto;
        this.fotoPrincipal = quarto.fotos[0] || '';
        this.carregando = false;
      },
      error: (error: any) => {  // ← CORREÇÃO AQUI
        console.error('Erro ao carregar quarto:', error);
        this.carregando = false;
      }
    });
  }

  alterarFotoPrincipal(foto: string): void {
    this.fotoPrincipal = foto;
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPs6VIm8gbsOjbyBjYXJyZWdhZG88L3RleHQ+Cjwvc3ZnPg==';
  }
}