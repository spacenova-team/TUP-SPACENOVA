import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAsteroids } from '../items/items-interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly http = inject(HttpClient);

  API_URL = 'https://tup-spacenova.onrender.com/asteroids';

  fetchAsteroidsFromNasa(): Observable<IAsteroids[]> {
    console.log(this.http.get<IAsteroids[]>(this.API_URL));
    return this.http.get<IAsteroids[]>(this.API_URL);
    // return this.http.get<INasaApiResponse>(this.API_URL).pipe(
    //   map((res: INasaApiResponse) => {
    //     return (Object.values(res.near_earth_objects).flat() as INasaAsteroidRaw[]).map(
    //       (a: INasaAsteroidRaw) => ({
    //         name: a.name,
    //         minDiameter: Number(a.estimated_diameter.meters?.estimated_diameter_min.toFixed(2)),
    //         maxDiameter: Number(a.estimated_diameter.meters?.estimated_diameter_max.toFixed(2)),
    //         hazardous: a.is_potentially_hazardous_asteroid,
    //         approachDate: a.close_approach_data[0].close_approach_date_full,
    //         velocity: Number(a.close_approach_data[0].relative_velocity?.kilometers_per_hour),
    //         orbitingBody: a.close_approach_data[0].orbiting_body
    //       })
    //     );
    //   }),
    //   catchError((error) => {
    //     console.log('Falla en la comunicación con la NASA', error);
    //     return throwError(() => error);
    //   })
    // );
  }
}
