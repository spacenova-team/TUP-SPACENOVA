import { Routes } from '@angular/router';
// import { Home } from './home/home';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path : 'home',
        loadChildren: () => import('./home/home.routes').then(m => m.routes)
    },
    {
        path: 'login',
        loadChildren: () => import('./login/login.routes').then(m => m.routes)
    },
    {
        path: 'settings',
        loadChildren: () => import('./user-setting/user-setting.routes').then(m => m.routes)
    }
];
