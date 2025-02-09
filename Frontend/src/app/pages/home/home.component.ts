import { Component } from '@angular/core';
import { searchbarComponent } from '../../components/searchbarComponent/searchbar.component';
import { tableComponent } from '../../components/tableComponent/table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    searchbarComponent,
    tableComponent,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class HomeComponent {
  arrivals: any[] = [];

  updateArrivals(arrivals: any[]) {
    this.arrivals = arrivals;
  }
}