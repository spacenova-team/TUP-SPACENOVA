import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpandSidenav {
  expand = false;

  toggle(): void {
    this.expand = !this.expand;
  }
}
