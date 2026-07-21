import {
  ApplicationConfig,
  ErrorHandler,
  provideBrowserGlobalErrorListeners,
  isDevMode,
  InjectionToken
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp } from 'firebase/app';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideHttpClient } from '@angular/common/http';
import { provideServiceWorker } from '@angular/service-worker';
import * as Sentry from '@sentry/angular';
import { getAuth, Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBiJ_c_NbbYKiJjYAlcguTStG2hlzc1qdk',
  authDomain: 'spacenova-fb63f.firebaseapp.com',
  projectId: 'spacenova-fb63f',
  storageBucket: 'spacenova-fb63f.firebasestorage.app',
  messagingSenderId: '843092324395',
  appId: '1:843092324395:web:757ba79a6d32bf8fa9ba6e'
};
const app = initializeApp(firebaseConfig);
const authInstance = getAuth(app);

export const FIREBASE_AUTH = new InjectionToken<Auth>('FirebaseAuth', {
  providedIn: 'root',
  factory: () => authInstance
});

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler()
    },
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',
        suffix: '.json'
      }),
      fallbackLang: 'en',
      lang: 'en'
    }),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
};
