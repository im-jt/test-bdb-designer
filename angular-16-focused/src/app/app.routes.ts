import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/designer',
    pathMatch: 'full'
  },
  {
    path: 'designer',
    loadComponent: () => import('./components/designer-home/designer-home.component').then(m => m.DesignerHomeComponent)
  },
  {
    path: '**',
    redirectTo: '/designer'
  }
];