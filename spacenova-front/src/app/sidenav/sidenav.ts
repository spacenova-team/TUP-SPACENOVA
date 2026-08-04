import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { Header } from '../header/header';
import { ExpandSidenav } from './expand-sidenav';

interface MenuItem {
  icon: string;
  text: string;
  route: string;
}

@Component({
  selector: 'app-sidenav',
  imports: [MatSidenavModule, MatIconModule, MatListModule, RouterModule, Header],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.css'
})
export class Sidenav {
  menuItems: MenuItem[] = [
    { icon: 'apps', text: 'Items', route: '/items' },
    { icon: 'settings', text: 'Settings', route: '/settings' }
  ];

  sidenavService = inject(ExpandSidenav);
}
