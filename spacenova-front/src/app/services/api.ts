import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { IAsteroids, INasaApiResponse, INasaAsteroidRaw } from '../items/items-interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly http = inject(HttpClient);

  private readonly API_URL =
    'https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=';
  private readonly API_KEY = '6U6EJ2FYWVaAyd55wY6loz9JcGIs4IwDMuVRv3iV';

  fetchAsteroidsFromNasa(): Observable<IAsteroids[]> {
    return this.http.get<INasaApiResponse>(this.API_URL + this.API_KEY).pipe(
      map((res: INasaApiResponse) => {
        return (Object.values(res.near_earth_objects).flat() as INasaAsteroidRaw[]).map(
          (a: INasaAsteroidRaw) => ({
            name: a.name,
            minDiameter: Number(a.estimated_diameter.meters?.estimated_diameter_min.toFixed(2)),
            maxDiameter: Number(a.estimated_diameter.meters?.estimated_diameter_max.toFixed(2)),
            hazardous: a.is_potentially_hazardous_asteroid,
            approachDate: a.close_approach_data[0].close_approach_date_full,
            velocity: Number(a.close_approach_data[0].relative_velocity?.kilometers_per_hour),
            orbitingBody: a.close_approach_data[0].orbiting_body
          })
        );
      }),
      catchError((error) => {
        console.log('Falla en la comunicación con la NASA', error);
        return throwError(() => error);
      })
    );
  }
}
