import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Translations } from '../translations/translations';
import { ExpandSidenav } from '../sidenav/expand-sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  imports: [TranslatePipe, Translations, MatIconModule, MatButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  sidenavService = inject(ExpandSidenav);
}
