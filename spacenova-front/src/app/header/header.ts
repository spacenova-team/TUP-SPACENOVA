import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Translations } from '../translations/translations';

@Component({
  selector: 'app-header',
  imports: [TranslatePipe, Translations],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {}
