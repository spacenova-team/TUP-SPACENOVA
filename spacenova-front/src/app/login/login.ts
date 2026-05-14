import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { GoogleAuthProvider, Auth, signInWithPopup } from '@angular/fire/auth'

interface User {
  username: string,
  password: string
}

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatProgressSpinnerModule, MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {
  username: string = ''
  password: string = ''
  isLoading: boolean = false
  USER_KEY = 'userLogged'

  private router = inject(Router)
  private auth = inject(Auth)

  user: User = { username: '', password: '' }

  login() {
    const provider = new GoogleAuthProvider()

    signInWithPopup(this.auth, provider)
    .then((result) => {
      const user = result.user
      const userData = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL
      }
      localStorage.setItem(this.USER_KEY, JSON.stringify(userData))
      this.router.navigate(['/home'])
    })
    .catch((error) => console.log(error))
  }

  // login() {
  //   if (!this.username || !this.password) {
  //     return
  //   }

  //   this.user = {username: this.username, password: this.password}

  //   localStorage.setItem('userLogged', JSON.stringify(this.user))
  //   this.isLoading = true

  //   setTimeout(() => {
  //     this.router.navigate(['/home'])
  //   }, 2000)

  // }

}
