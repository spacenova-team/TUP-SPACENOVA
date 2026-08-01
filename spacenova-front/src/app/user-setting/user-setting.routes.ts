import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./user-setting').then((m) => m.UserSetting)
  },
  {
    path: 'account',
    loadComponent: () => import('./account/account').then((m) => m.Account)
  }
];
