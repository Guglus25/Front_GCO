import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home-page.component'),
    children: [
      {
        path: 'product/:id',
        loadComponent: () =>
          import('./pages/product/Pages/product-page.component'),
      },
      {
        path: 'productlist',
        loadComponent: () =>
          import('./pages/product/Pages/productList-page.component'),
      },
      {
        path: 'movement/:idproducto/:id',
        loadComponent: () =>
          import('./pages/movements/Pages/movements-page.component'),
      },
      {
        path: 'movementlist/:idproducto',
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
