import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadComponent: () =>
      import('./pages/products-page/products-page.component').then(
        (c) => c.ProductsPageComponent
      ),
  },
  {
    path: 'tables',
    loadComponent: () =>
      import('./pages/table-page/table-page.component').then(
        (c) => c.TablePageComponent
      ),
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./pages/users-page/users-page.component').then(
        (c) => c.UsersPageComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login-pages/login-pages.component').then(
        (c) => c.LoginPagesComponent
      ),
  },
];
