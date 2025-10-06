import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HotelService } from '../../services/hotel.service';
import { Hotel } from '../../types/hotel.model';

@Component({
  selector: 'app-detalhes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalhes.component.html',
  styleUrl: './detalhes.component.css'
})
export class DetalhesComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private hotelService = inject(HotelService);
  
  hotel?: Hotel;
  carregando = true;
  fotoPrincipal = '';

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const hotelId = params['id'];
      this.carregarHotel(hotelId);
    });
  }

  carregarHotel(id: string): void {
    this.hotelService.getHotelById(id).subscribe({
      next: (hotel) => {
        this.hotel = hotel;
        this.fotoPrincipal = hotel.fotos[0] || '';
        this.carregando = false;
      },
      error: (error) => {
        console.error('Erro ao carregar hotel:', error);
        this.carregando = false;
      }
    });
  }

  alterarFotoPrincipal(foto: string): void {
    this.fotoPrincipal = foto;
  }
}