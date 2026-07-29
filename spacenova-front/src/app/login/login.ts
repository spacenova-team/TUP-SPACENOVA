import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { getAuth } from 'firebase/auth';
import { Translations } from '../translations/translations';
import { AnalyticsService } from '../analytics-service';
import * as Sentry from '@sentry/angular';
import { AuthService } from '../auth-service';

interface User {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    TranslatePipe,
    Translations
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  username = '';
  password = '';
  isLoading = false;
  USER_KEY = 'userLogged';

  private router = inject(Router);
  private auth = getAuth();
  authService = inject(AuthService);

  user: User = { username: '', password: '' };

  analyticsService = inject(AnalyticsService);

  async login() {
    try {
      const result = await this.authService.loginWithGoogle();
      const user = result.user;
      const userData = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL
      };
      localStorage.setItem(this.USER_KEY, JSON.stringify(userData));
      this.analyticsService.trackEvent('login', { method: 'Google', userEmail: userData.email });
      Sentry.withScope((scope) => {
        scope.setUser({
          email: userData.email ?? undefined,
          username: userData.name ?? undefined
        });

        scope.captureException(new Error('Error after log in'));
      });

      this.router.navigate(['/items']);
    } catch (error) {
      console.log(error);
    }
  }
}
