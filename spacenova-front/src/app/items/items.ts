import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
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
import { TranslatePipe } from '@ngx-translate/core';

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
    Sidenav,
    TranslatePipe
  ],
  templateUrl: './items.html',
  styleUrl: './items.css'
})
export class Items implements OnInit, OnDestroy {
  private readonly stateService = inject(StateService);
  private readonly checkLoading = inject(ChangeDetectorRef);
  private subscription!: Subscription;

  asteroidsArray: IAsteroids[] = [];
  loading = true;
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
      error: () => {
        this.errorLoadingApi = true;
        this.loading = false;
        this.checkLoading.detectChanges();
      },
      complete: () => {
        this.loading = false;
        this.checkLoading.detectChanges();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}

// creo alg vacio para pruebas de compilacion, no se si es necesario o no
