import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.routes').then((m) => m.routes)
  },
  {
    path: 'settings',
    loadChildren: () => import('./user-setting/user-setting.routes').then((m) => m.routes)
  },
  {
    path: 'items',
    loadChildren: () => import('./items/items.routes').then((m) => m.routes)
  }
];
