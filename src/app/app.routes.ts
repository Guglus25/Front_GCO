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
        path: 'productlist',
        loadComponent: () =>
          import('./pages/product/Pages/productList-page.component'),
      },
      {
        path: 'movement',
        loadComponent: () =>
          import('./pages/movements/Pages/movements-page.component'),
      },
      {
        path: 'movementlist',
        loadComponent: () =>
          import('./pages/movements/Pages/movementsList-page.component'),
      },
      
    ],
  },

  {
    path: '**',
    redirectTo: 'home',
  },
];
