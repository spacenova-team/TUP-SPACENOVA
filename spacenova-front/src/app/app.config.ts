import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBiJ_c_NbbYKiJjYAlcguTStG2hlzc1qdk',
  authDomain: 'spacenova-fb63f.firebaseapp.com',
  projectId: 'spacenova-fb63f',
  storageBucket: 'spacenova-fb63f.firebasestorage.app',
  messagingSenderId: '843092324395',
  appId: '1:843092324395:web:757ba79a6d32bf8fa9ba6e',
};
initializeApp(firebaseConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), provideRouter(routes),


  ],
};
