import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/homes/homes.component').then(m => m.HomesComponent)
  },
  {
    path: 'view/:id',
    loadComponent: () => import('./pages/detalhes/detalhes.component').then(m => m.DetalhesComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent)
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
