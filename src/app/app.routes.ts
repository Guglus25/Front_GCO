import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'Home',
    loadComponent: () => import('./pages/product/Pages/product-page.component'),
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
    ],
  },

  {
    path: '**',
    redirectTo: 'product',
  },
];
