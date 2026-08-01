import { Component, OnInit, inject, TemplateRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Sidenav } from '../sidenav/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TranslatePipe } from '@ngx-translate/core';
import { Header } from '../header/header';
import { AnalyticsService } from '../analytics-service';
import { AuthService } from '../auth-service';
import { UserService } from '../services/user';
import { IUserInfo } from './user-setting-interfaces';

@Component({
  selector: 'app-user-setting',
  imports: [
    Sidenav,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    TranslatePipe,
    Header,
    RouterLink
  ],
  templateUrl: './user-setting.html',
  styleUrl: './user-setting.css'
})
export class UserSetting implements OnInit {
  userAgent = '';
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private userService = inject(UserService);
  auth = inject(AuthService);
  analyticsService = inject(AnalyticsService);
  userInfo: IUserInfo = {
    name: '',
    email: '',
    photo: ''
  };

  @ViewChild('logoutDialog') dialogTemplate!: TemplateRef<unknown>;

  ngOnInit() {
    this.userAgent = navigator.userAgent;
    const storedUser = this.userService.getUserInfo();
    if (storedUser) {
      this.userInfo = storedUser;
    }
  }

  logout() {
    this.dialog.open(this.dialogTemplate, {
      width: '25rem',
      panelClass: 'custom-dialog'
    });
  }

  async confirmLogout() {
    this.dialog.closeAll();
    try {
      await this.auth.logout();
      this.userService.clearUserInfo();
      this.router.navigate(['/login']);
      this.analyticsService.trackEvent('logout', { method: 'Google' });
    } catch (error) {
      console.log(error);
    }
  }
}
