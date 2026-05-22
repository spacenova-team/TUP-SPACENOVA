import { Component, inject } from '@angular/core';
import { TranslationsService } from './translations-service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-translations',
  imports: [MatButtonToggleModule],
  templateUrl: './translations.html',
  styleUrl: './translations.css'
})
export class Translations {
  translateService = inject(TranslationsService)

  languagesOption = this.translateService.languages
}
