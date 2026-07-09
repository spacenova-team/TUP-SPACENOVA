import { Component, inject } from '@angular/core';
import { TranslationsService } from './translations-service';
import { AnalyticsService } from '../analytics-service';

@Component({
  selector: 'app-translations',
  imports: [],
  templateUrl: './translations.html',
  styleUrl: './translations.css'
})
export class Translations {
  translateService = inject(TranslationsService);
  analyticsService = inject(AnalyticsService);
  languagesOption = this.translateService.languages;
  gtmclick() {
    this.analyticsService.trackEvent('changeLang', { method: 'Google' });
  }
}
