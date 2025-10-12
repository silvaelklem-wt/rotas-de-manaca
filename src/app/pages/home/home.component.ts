import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  features = [
    {
      icon: '🏨',
      title: 'Conforto Garantido',
      description: 'Quartos equipados com as melhores comodidades para sua estadia perfeita'
    },
    {
      icon: '🌴',
      title: 'Localização Privilegiada',
      description: 'No coração da Amazônia, com fácil acesso aos principais atrativos'
    },
    {
      icon: '🍽️',
      title: 'Experiência Gastronômica',
      description: 'Restaurante com pratos típicos da região e culinária internacional'
    },
    {
      icon: '🚤',
      title: 'Passeios Exclusivos',
      description: 'Organizamos os melhores passeios pela floresta e rios locais'
    }
  ];

  testimonials = [
    {
      name: 'Maria Silva',
      location: 'São Paulo',
      text: 'Experiência incrível! O hotel superou todas as expectativas. Quartos impecáveis e atendimento excepcional.',
      rating: 5
    },
    {
      name: 'João Santos',
      location: 'Manaus',
      text: 'Perfeito para negócios. Wi-Fi excelente e quartos muito confortáveis. Voltarei com certeza!',
      rating: 5
    },
    {
      name: 'Ana Costa',
      location: 'Rio de Janeiro',
      text: 'A localização é fantástica e os passeios organizados pelo hotel foram o ponto alto da viagem.',
      rating: 4
    }
  ];
}