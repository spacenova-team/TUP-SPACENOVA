import { Routes } from '@angular/router';
// import { Home } from './home';


export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./home').then(m => m.Home)
    }

];




