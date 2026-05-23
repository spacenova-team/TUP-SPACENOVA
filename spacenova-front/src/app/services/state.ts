import { inject, Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { IAsteroids } from '../items/items-interfaces';
import { StorageService } from './storage';
import { ApiService } from './api';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private readonly storageService = inject(StorageService);
  private readonly apiService = inject(ApiService);

  getAsteroids(): Observable<IAsteroids[]> {
    const storedAsteroids = this.storageService.getAsteroids();

    if (storedAsteroids) {
      return of(storedAsteroids);
    }

    return this.apiService.fetchAsteroidsFromNasa().pipe(
      tap((asteroidsFromApi) => {
        this.storageService.saveAsteroids(asteroidsFromApi);
      }),
    );
  }
}
