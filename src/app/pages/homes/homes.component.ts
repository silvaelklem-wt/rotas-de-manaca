import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RoomService } from '../../services/room.service';
import { Room } from '../../types/room.model';

@Component({
  selector: 'app-homes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './homes.component.html',
  styleUrl: './homes.component.css'
})
export class HomesComponent implements OnInit {
  private roomService = inject(RoomService);
  
  quartos: Room[] = [];
  carregando = true;
  erro = '';

  ngOnInit(): void {
    this.carregarQuartos();
  }

  carregarQuartos(): void {
    this.carregando = true;
    this.erro = '';
    
    this.roomService.getQuartos().subscribe({
      next: (quartos: Room[]) => {
        this.quartos = quartos;
        this.carregando = false;
      },
      error: (error: any) => {  // ← CORREÇÃO AQUI
        console.error('Erro ao carregar quartos:', error);
        this.erro = 'Erro ao carregar a lista de quartos.';
        this.carregando = false;
      }
    });
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPs6VIm8gbsOjbyBjYXJyZWdhZG88L3RleHQ+Cjwvc3ZnPg==';
  }
}