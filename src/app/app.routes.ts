import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home-page.component'),
    children: [
      {
        path: 'product',
        loadComponent: () =>
          import('./pages/product/Pages/product-page.component'),
      },
      {
        path: 'movement',
        loadComponent: () =>
          import('./pages/movements/Pages/movements.component'),
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'home',
  },
];
