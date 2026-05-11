import { Component } from '@angular/core';
// import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
// import { MatIconTestingModule } from '@angular/material/icon/testing';
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
  styleUrl: './sidenav.css',
})


export class Sidenav {
  menuItems: MenuItem[] = [
    { icon: 'home', text: 'Home', route: '/home' },
    { icon: 'apps', text: 'Items', route: '/items' },
    { icon: 'settings', text: 'Settings', route: '/settings' }
  ];

  openmenu: boolean = false;

  toggleMenu() {
    this.openmenu = !this.openmenu;
  }

}


