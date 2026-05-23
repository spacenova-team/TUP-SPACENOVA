import { Component, inject } from '@angular/core';
import { TranslationsService } from './translations-service';

@Component({
  selector: 'app-translations',
  imports: [],
  templateUrl: './translations.html',
  styleUrl: './translations.css'
})
export class Translations {
  translateService = inject(TranslationsService)

  languagesOption = this.translateService.languages
}
