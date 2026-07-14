import { Component, OnInit, inject, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Sidenav } from '../sidenav/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TranslatePipe } from '@ngx-translate/core';
import { AnalyticsService } from '../analytics-service';

@Component({
  selector: 'app-user-setting',
  imports: [Sidenav, MatButtonModule, MatIconModule, MatDialogModule, TranslatePipe],
  templateUrl: './user-setting.html',
  styleUrl: './user-setting.css'
})
export class UserSetting implements OnInit {
  userAgent = '';
  private router = inject(Router);
  private dialog = inject(MatDialog);
  analyticsService = inject(AnalyticsService);
  USER_KEY = 'userLogged';
  userInfo = {
    name: '',
    email: '',
    photo: ''
  };
  parsedData: string | null = '';

  @ViewChild('logoutDialog') dialogTemplate!: TemplateRef<unknown>;

  ngOnInit() {
    this.userAgent = navigator.userAgent;
    this.parsedData = localStorage.getItem(this.USER_KEY);
    if (this.parsedData) {
      this.userInfo = JSON.parse(this.parsedData);
      console.log(this.userInfo);
    }
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
    this.analyticsService.trackEvent('logout', { method: 'Google' });
  }
}
