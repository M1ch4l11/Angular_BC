import { Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthGuardServiceAdmin } from './services/auth-guard-admin.service';

export const routes: Routes = [
  {
    path: 'products',
    loadComponent: () =>
      import('./pages/products-page/products-page.component').then(
        (c) => c.ProductsPageComponent
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'tables',
    loadComponent: () =>
      import('./pages/table-page/table-page.component').then(
        (c) => c.TablePageComponent
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'employees',
    loadComponent: () =>
      import('./pages/employees-page/employees-page.component').then(
        (c) => c.EmployeesPageComponent
      ),
    canActivate: [AuthGuardServiceAdmin],
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/login-pages/login-pages.component').then(
        (c) => c.LoginPagesComponent
      ),
  },
];
