import { Component, inject } from '@angular/core';
import { ItemsService } from '../items-service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ItemsSearchPipe } from '../items-search-pipe';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { Sidenav } from '../sidenav/sidenav';
import { IAsteroids } from '../interfaces';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [
    CommonModule, ItemsSearchPipe, MatProgressSpinnerModule, 
    MatInputModule, MatFormFieldModule, FormsModule, MatMenuModule, 
    MatButtonModule, MatSliderModule, Sidenav
  ],
  templateUrl: './items.html',
  styleUrl: './items.css',
})

export class Items {
  itemsService = inject(ItemsService)
  ASTEROIDS_KEY = 'asteroids'
  asteroidsArray: IAsteroids[]= []
  // res: IAsteroids[] = []
  loading: boolean = false
  asteroidsFilter: string = ''
  selectedFilter: string = ''
  errorLoadingApi: boolean = false
  sliderMin = 2000
  sliderMax = 100000
  sliderStep = 1000
  value = 0

  setFilter (filter:string) {
    this.selectedFilter = filter
  }

  async ngOnInit() {    

    try {
      this.asteroidsArray = await this.itemsService.getAsteroids()
      console.log(this.asteroidsArray)

      if (!this.asteroidsArray) {
        this.errorLoadingApi = true
      }
      
    } catch (error) {
      console.log(error)
      this.errorLoadingApi = true
      console.log(this.errorLoadingApi)
    } finally {
      this.loading = false
    }

  }
}
