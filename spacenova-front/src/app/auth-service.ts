import { inject, Injectable } from '@angular/core';
import { FIREBASE_AUTH } from './app.config';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User
} from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth = inject(FIREBASE_AUTH);

  user: User | null = null;
  role: 'cientific' | 'admirer' | null = null;

  constructor() {
    onAuthStateChanged(this.auth, async (user) => {
      this.user = user;

      if (user) {
        const tokenResult = await user.getIdTokenResult();
        this.role = tokenResult.claims['role'] as 'cientific' | 'admirer';
      } else {
        this.role = null;
      }
    });
  }

  async refreshUserTokenAndRole() {
    const user = this.auth.currentUser;
    if (user) {
      const tokenResult = await user.getIdTokenResult(true);
      const newRole = tokenResult.claims['role'] as 'cientific' | 'admirer';
      this.role = newRole || 'admirer';
    }
  }

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    return signInWithPopup(this.auth, provider);
  }

  logout() {
    return signOut(this.auth);
  }
}
