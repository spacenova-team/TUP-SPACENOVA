import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAsteroids } from '../items/items-interfaces';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly http = inject(HttpClient);

  API_URL = `${environment.apiUrl}/asteroids`;

  fetchAsteroidsFromNasa(): Observable<IAsteroids[]> {
    console.log(this.http.get<IAsteroids[]>(this.API_URL));
    return this.http.get<IAsteroids[]>(this.API_URL);
  }
}
