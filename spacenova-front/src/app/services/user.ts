import { Injectable } from '@angular/core';
import { IUserInfo } from '../user-setting/user-setting-interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly USER_KEY = 'userLogged';

  getUserInfo(): IUserInfo | null {
    const stored = localStorage.getItem(this.USER_KEY);
    return stored ? JSON.parse(stored) : null;
  }

  updateUserInfo(changes: Partial<IUserInfo>): IUserInfo | null {
    const current = this.getUserInfo();
    if (!current) {
      return null;
    }

    const updated: IUserInfo = { ...current, ...changes };
    localStorage.setItem(this.USER_KEY, JSON.stringify(updated));
    return updated;
  }

  clearUserInfo(): void {
    localStorage.removeItem(this.USER_KEY);
  }
}
