import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';
import { Header } from '../../header/header';
import { Sidenav } from '../../sidenav/sidenav';
import { UserService } from '../../services/user';
import { IUserInfo } from '../user-setting-interfaces';

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
    RouterLink
  ],
  templateUrl: './account.html',
  styleUrl: './account.css'
})
export class Account implements OnInit {
  private readonly userService = inject(UserService);

  userInfo: IUserInfo = {
    name: '',
    email: '',
    photo: ''
  };
  saved = false;

  ngOnInit() {
    const storedUser = this.userService.getUserInfo();
    if (storedUser) {
      this.userInfo = storedUser;
    }
  }

  save() {
    const updated = this.userService.updateUserInfo({
      phone: this.userInfo.phone,
      address: this.userInfo.address,
      birthDate: this.userInfo.birthDate
    });

    if (updated) {
      this.userInfo = updated;
      this.saved = true;
      setTimeout(() => (this.saved = false), 3000);
    }
  }
}
