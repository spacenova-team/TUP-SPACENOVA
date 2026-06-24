import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import * as Sentry from '@sentry/angular';

Sentry.init({
  dsn: 'https://907951ffc579637acdd4f7088f52bde8@o4511577353945088.ingest.us.sentry.io/4511577362006016',
  dataCollection: {}
});

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
