import { Component } from '@angular/core';
import { Sidenav } from '../sidenav/sidenav';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [Sidenav, TranslatePipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home { }
