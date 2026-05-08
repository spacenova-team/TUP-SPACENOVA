import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, throwError, timestamp } from 'rxjs';
import { IAsteroids } from './interfaces';

interface ILocalStorageData {
  data: IAsteroids[],
  timestamp: number
}

@Injectable({
  providedIn: 'root',
})

export class ItemsService {
  readonly http = inject(HttpClient)

  API_URL = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key='
  API_KEY = '6U6EJ2FYWVaAyd55wY6loz9JcGIs4IwDMuVRv3iV'
  ASTEROIDS_KEY = 'asteroids'
  TIME_STORED = 5 * 60 * 1000

  dataStored: ILocalStorageData = {
    data: [],
    timestamp: 0
  }
  asteroids: IAsteroids[] = []

  async getAsteroids() {
    const now = Date.now()
    const stored = localStorage.getItem(this.ASTEROIDS_KEY)

    if (stored) {
      this.dataStored = JSON.parse(stored)

      const expired = now - this.dataStored.timestamp > this.TIME_STORED
      if (!expired) {
        return this.dataStored.data

      }
      localStorage.removeItem(this.ASTEROIDS_KEY)

    }
    return lastValueFrom(this.http.get<any>(this.API_URL + this.API_KEY)).then((res: any) => {
      const data = Object.values(res.near_earth_objects).flat()
      this.asteroids = data.map((a:any) => ({
        name: a.name,
        minDiameter: a.estimated_diameter.meters?.estimated_diameter_min.toFixed(2),
        maxDiameter: a.estimated_diameter.meters?.estimated_diameter_max.toFixed(2),
        hazardous: a.is_potentially_hazardous_asteroid,
        approachDate: a.close_approach_data[0].close_approach_date_full,
        velocity: Number(a.close_approach_data[0].relative_velocity?.kilometers_per_hour),
        orbitingBody: a.close_approach_data[0].orbiting_body
      }))
      const dataToStore: ILocalStorageData = {
        data: this.asteroids,
        timestamp: now
      }
      localStorage.setItem(this.ASTEROIDS_KEY, JSON.stringify(dataToStore))
      
      return this.asteroids
    }).catch(error => {
      console.log(error)
      throw error
    })
}

}
