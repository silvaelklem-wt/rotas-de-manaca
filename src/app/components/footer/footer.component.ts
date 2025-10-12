import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  // Links do footer organizados por categoria
  footerSections = [
    {
      title: 'Descubra',
      links: [
        { label: 'Hotéis em Promoção', path: '/ofertas' },
        { label: 'Destinos Populares', path: '/destinos' },
        { label: 'Hotéis 5 Estrelas', path: '/luxo' },
        { label: 'Pacotes de Viagem', path: '/pacotes' },
        { label: 'Experiências Únicas', path: '/experiencias' }
      ]
    },
    {
      title: 'Empresa',
      links: [
        { label: 'Sobre Nós', path: '/sobre' },
        { label: 'Carreiras', path: '/carreiras' },
        { label: 'Imprensa', path: '/imprensa' },
        { label: 'Blog', path: '/blog' },
        { label: 'Investidores', path: '/investidores' }
      ]
    },
    {
      title: 'Suporte',
      links: [
        { label: 'Central de Ajuda', path: '/ajuda' },
        { label: 'Política de Cancelamento', path: '/cancelamento' },
        { label: 'FAQ', path: '/faq' },
        { label: 'Termos de Uso', path: '/termos' },
        { label: 'Privacidade', path: '/privacidade' }
      ]
    },
    {
      title: 'Parceiros',
      links: [
        { label: 'Seja um Parceiro', path: '/parceiros' },
        { label: 'Programa de Afiliados', path: '/afiliados' },
        { label: 'API para Desenvolvedores', path: '/api' },
        { label: 'HotelFind Business', path: '/business' }
      ]
    }
  ];

  socialLinks = [
    { name: 'Facebook', icon: '📘', url: '#' },
    { name: 'Instagram', icon: '📷', url: '#' },
    { name: 'Twitter', icon: '🐦', url: '#' },
    { name: 'LinkedIn', icon: '💼', url: '#' },
    { name: 'YouTube', icon: '📺', url: '#' }
  ];

  appStores = [
    { 
      name: 'App Store', 
      icon: '📱', 
      url: '#',
      description: 'Baixe na App Store'
    },
    { 
      name: 'Google Play', 
      icon: '🤖', 
      url: '#',
      description: 'Disponível no Google Play'
    }
  ];

  paymentMethods = [
    '💳', '📱', '🏦', '🔗', '💎', '📊', '🛡️'
  ];

  contactInfo = {
    phone: '(92) 93361-1234',
    email: 'contato@rotasdemanaca.com',
    address: 'Av. Boulevard Pedro Rattes, 1000 - Manacapuru, AM'
  };
}