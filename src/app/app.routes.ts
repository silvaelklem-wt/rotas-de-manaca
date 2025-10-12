import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'quartos',
    loadComponent: () => import('./pages/homes/homes.component').then(m => m.HomesComponent)
  },
  {
    path: 'view/:id',
    loadComponent: () => import('./pages/detalhes/detalhes.component').then(m => m.DetalhesComponent)
  },
  {
    path: 'ofertas',
    loadComponent: () => import('./pages/ofertas/ofertas.component').then(m => m.OfertasComponent)
  },
  {
    path: 'favoritos', 
    loadComponent: () => import('./pages/favoritos/favoritos.component').then(m => m.FavoritosComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];