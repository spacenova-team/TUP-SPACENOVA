import { inject, Injectable } from '@angular/core';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationsService {
  languages: string[] = ['en', 'es']
  // currentLanguage = 'en'
  private translate = inject(TranslateService)
  LANGUAGE_KEY: string = 'language'
  storedLanguage: string | null = 'en'

  initialize() {
    this.translate.addLangs(this.languages) // Available languages to Angular translation service.

    this.storedLanguage = localStorage.getItem(this.LANGUAGE_KEY)
    if (this.storedLanguage) {
      this.translate.use(this.storedLanguage)
    }
  }

  switchLanguage(language: string) {
    if (!this.languages.includes(language)) {
      language = 'en' // By default the page will be in english.
    }

    // this.currentLanguage = language    
    this.translate.use(language)
    localStorage.setItem('language', JSON.stringify(language))
  }
}
