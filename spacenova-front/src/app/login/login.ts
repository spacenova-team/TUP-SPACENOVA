import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { Translations } from '../translations/translations';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

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

  user: User = { username: '', password: '' };

  gtmservices = inject(GoogleTagManagerService);

  login() {
    const provider = new GoogleAuthProvider();

    const gtmTag = {
      event: 'Login',
      category: 'Login',
      date: new Date()
    };
    this.gtmservices.pushTag(gtmTag);
    signInWithPopup(this.auth, provider)
      .then((result) => {
        const user = result.user;
        const userData = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL
        };
        localStorage.setItem(this.USER_KEY, JSON.stringify(userData));
        throw new Error(`${userData.email}`);
        this.router.navigate(['/home']);
      })
      .catch((error) => console.log(error));
  }
}
