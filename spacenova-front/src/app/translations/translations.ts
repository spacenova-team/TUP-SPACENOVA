import { Component, inject } from '@angular/core';
import { TranslationsService } from './translations-service';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

@Component({
  selector: 'app-translations',
  imports: [],
  templateUrl: './translations.html',
  styleUrl: './translations.css'
})
export class Translations {
  translateService = inject(TranslationsService);
  gtmservices = inject(GoogleTagManagerService);
  languagesOption = this.translateService.languages;
  gtmclick() {
    const gtmTag = {
      event: 'Lenguage',
      category: 'Idiom',
      label: 'chance language'
    };
    this.gtmservices.pushTag(gtmTag);
  }
}
