import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMenuOpen = false;
  isSearchOpen = false;
  isUserMenuOpen = false;

  // Categorias baseadas em sites de busca e aluguel
  categorias = [
    {
      nome: 'Tipo de Hotel',
      itens: ['Hotel', 'Resort', 'Pousada', 'Hostel', 'Apart-Hotel', 'Chalé']
    },
    {
      nome: 'Localização',
      itens: ['Praia', 'Montanha', 'Cidade', 'Campo', 'Histórico']
    },
    {
      nome: 'Comodidades',
      itens: ['Piscina', 'Wi-Fi Grátis', 'Estacionamento', 'Ar Condicionado', 'Café da Manhã']
    },
    {
      nome: 'Preço',
      itens: ['Econômico', 'Médio', 'Luxo', 'All Inclusive']
    },
    {
      nome: 'Avaliação',
      itens: ['5 Estrelas', '4 Estrelas', '3 Estrelas', 'Mais de 8/10']
    }
  ];

  menuItems = [
    { label: 'Início', path: '/', icon: '🏠' },
    { label: 'Hotéis', path: '/', icon: '🏨' },
    { label: 'Ofertas', path: '/ofertas', icon: '🔥' },
    { label: 'Favoritos', path: '/favoritos', icon: '❤️' },
    { label: 'Admin', path: '/admin', icon: '⚙️' }
  ];

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      this.isSearchOpen = false;
      this.isUserMenuOpen = false;
    }
  }

  toggleSearch(): void {
    this.isSearchOpen = !this.isSearchOpen;
    if (this.isSearchOpen) {
      this.isMenuOpen = false;
      this.isUserMenuOpen = false;
    }
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
    if (this.isUserMenuOpen) {
      this.isMenuOpen = false;
      this.isSearchOpen = false;
    }
  }

  closeAllMenus(): void {
    this.isMenuOpen = false;
    this.isSearchOpen = false;
    this.isUserMenuOpen = false;
  }

  search(term: string): void {
    if (term.trim()) {
      console.log('Buscando:', term);
      // Aqui você pode implementar a lógica de busca
      this.closeAllMenus();
    }
  }
}