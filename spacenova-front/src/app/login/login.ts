import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

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

  private router = inject(Router)

  user: User = {username: '', password: ''}

  login() {
    if (!this.username || !this.password) {
      return
    }

    this.user = {username: this.username, password: this.password}

    localStorage.setItem('userLogged', JSON.stringify(this.user))
    this.isLoading = true

    setTimeout(() => {
      this.router.navigate(['/home'])
    }, 2000)
    
  }

}
