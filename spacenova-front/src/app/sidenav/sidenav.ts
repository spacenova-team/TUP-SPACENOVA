import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';

interface MenuItem {
  icon: string;
  text: string;
  route: string;
}

@Component({
  selector: 'app-sidenav',
  imports: [MatSidenavModule, MatIconModule, MatListModule, RouterModule],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.css'
})
export class Sidenav {
  menuItems: MenuItem[] = [
    { icon: 'apps', text: 'Items', route: '/items' },
    { icon: 'settings', text: 'Settings', route: '/settings' }
  ];

  openmenu = false;

  toggleMenu() {
    this.openmenu = !this.openmenu;
  }
}
