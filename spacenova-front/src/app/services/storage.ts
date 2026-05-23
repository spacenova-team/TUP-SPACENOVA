import { Injectable } from '@angular/core';
import { IAsteroids, ILocalStorageData } from '../items/items-interfaces';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly ASTEROIDS_KEY = 'asteroids';
  private readonly TIME_STORED = 5 * 60 * 1000;

  getAsteroids(): IAsteroids[] | null {
    const now = Date.now();
    const stored = localStorage.getItem(this.ASTEROIDS_KEY);

    if (stored) {
      const dataStored: ILocalStorageData = JSON.parse(stored);

      const expired = now - dataStored.timestamp > this.TIME_STORED;

      if (!expired) {
        return dataStored.data;
      }

      localStorage.removeItem(this.ASTEROIDS_KEY);
    }

    return null;
  }

  saveAsteroids(asteroids: IAsteroids[]): void {
    const saveData: ILocalStorageData = {
      data: asteroids,
      timestamp: Date.now(),
    };
    localStorage.setItem(this.ASTEROIDS_KEY, JSON.stringify(saveData));
  }
}
