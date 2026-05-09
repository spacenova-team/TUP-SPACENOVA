import { Component, OnInit, inject, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Sidenav } from '../sidenav/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; 

@Component({
  selector: 'app-user-setting',
  imports: [Sidenav, MatButtonModule, MatIconModule, MatDialogModule], 
  templateUrl: './user-setting.html',
  styleUrl: './user-setting.css',
})
export class UserSetting implements OnInit {
  userAgent: string = '';
  private router = inject(Router);
  private dialog = inject(MatDialog);

  @ViewChild('logoutDialog') dialogTemplate!: TemplateRef<any>;

  ngOnInit() {
      this.userAgent = navigator.userAgent; 
  }

  logout() {
    this.dialog.open(this.dialogTemplate, {
      width: '25rem',
      panelClass: 'custom-dialog' 
    });
  }
  confirmLogout() {
    this.dialog.closeAll(); 
    localStorage.removeItem('userLogged');
    this.router.navigate(['/login']);
  }
}