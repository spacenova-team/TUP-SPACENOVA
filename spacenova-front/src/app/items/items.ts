import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { StateService } from '../services/state';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ItemsSearchPipe } from './items-search-pipe';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { Sidenav } from '../sidenav/sidenav';
import { IAsteroids } from './items-interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [
    CommonModule,
    ItemsSearchPipe,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatMenuModule,
    MatButtonModule,
    MatSliderModule,
    Sidenav
  ],
  templateUrl: './items.html',
  styleUrl: './items.css'
})
export class Items {
  stateService = inject(StateService);
  subscription!: Subscription;
  checkLoading = inject(ChangeDetectorRef);
  ASTEROIDS_KEY = 'asteroids';
  asteroidsArray: IAsteroids[] = [];
  loading = false;
  asteroidsSearchFilter = '';
  selectedFilter = '';
  errorLoadingApi = false;
  sliderMin = 2000;
  sliderMax = 100000;
  sliderStep = 1000;
  value = 0;

  setFilter(filter: string) {
    this.selectedFilter = filter;
  }

  ngOnInit(): void {
    this.subscription = this.stateService.getAsteroids().subscribe({
      next: (data) => {
        this.asteroidsArray = data;
      },
      error: (error) => {
        console.log(error);
        this.errorLoadingApi = true;
      },
      complete: () => {
        this.loading = false;
        this.checkLoading.detectChanges();
      }
    });
  }
}
