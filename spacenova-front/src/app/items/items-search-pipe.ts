import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'itemsSearch',
  standalone: true
})
export class ItemsSearchPipe implements PipeTransform {
  
  transform(asteroids: any[], search: string, filter: string, value: number): any[] {
    let result = asteroids
    
    if (search) {
      result = result.filter(a => (
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.minDiameter.toString().includes(search) ||
        a.maxDiameter.toString().includes(search) ||
        a.velocity.toString().includes(search) ||
        a.orbitingBody.toLowerCase().includes(search.toLowerCase())
      ))
    }

    if (value) {
      result = result.filter(a => {
        const velocity = a.velocity
        return velocity ? Number(velocity) <= value : false
      })
    }

    if (filter === 'hazardous') {
      result = result.filter(a => a.hazardous)
    }

    return result
  }
}
