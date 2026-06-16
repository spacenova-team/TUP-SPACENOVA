import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { GoogleTagManagerModule } from 'angular-google-tag-manager';
import * as Sentry from '@sentry/angular';

GoogleTagManagerModule.forRoot({
  id: 'G-0YQL2E3EL2'
});

Sentry.init({
  dsn: 'https://907951ffc579637acdd4f7088f52bde8@o4511577353945088.ingest.us.sentry.io/4511577362006016',
  dataCollection: {}
});

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
