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
  }
];