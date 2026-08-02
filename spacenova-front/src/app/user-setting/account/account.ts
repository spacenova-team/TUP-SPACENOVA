import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';
import { Header } from '../../header/header';
import { Sidenav } from '../../sidenav/sidenav';
import { UserService } from '../../services/user';
import { IUserInfo } from '../user-setting-interfaces';
import { MaxDateValidatorDirective } from './max-date-validator';

@Component({
  selector: 'app-account',
  imports: [
    Header,
    Sidenav,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    TranslatePipe,
    RouterLink,
    MaxDateValidatorDirective
  ],
  templateUrl: './account.html',
  styleUrl: './account.css'
})
export class Account implements OnInit {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  userInfo: IUserInfo = {
    name: '',
    email: '',
    photo: ''
  };
  maxBirthDate = new Date().toISOString().split('T')[0];

  ngOnInit() {
    const storedUser = this.userService.getUserInfo();
    if (storedUser) {
      this.userInfo = storedUser;
    }
  }

  onPhoneKeydown(event: KeyboardEvent) {
    if (event.ctrlKey || event.metaKey || event.altKey || event.key.length !== 1) {
      return;
    }
    if (!/[0-9+\-\s()]/.test(event.key)) {
      event.preventDefault();
    }
  }

  save() {
    this.userService.updateUserInfo({
      phone: this.userInfo.phone,
      address: this.userInfo.address,
      birthDate: this.userInfo.birthDate
    });

    this.router.navigate(['/settings']);
  }
}
