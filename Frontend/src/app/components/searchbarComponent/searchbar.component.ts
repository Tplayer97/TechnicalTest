import { Component } from '@angular/core';
import { ArrivalsService } from '../../services/arrivals.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
// We import Angular Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    // Angular Material Modules
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule
  ],
  standalone: true
})
export class searchbarComponent{
  selectedAirport: string = '';
  selectedDateRange = { start: null, end: null };
  airports = [
    { code: 'JFK', name: 'John F. Kennedy International Airport' },
    { code: 'LAX', name: 'Los Angeles International Airport' },
    { code: 'ORD', name: 'Chicago O’Hare International Airport' }
  ];

  constructor(private arrivalsService: ArrivalsService) {}

  fetchFlights() {
    const airport = this.selectedAirport;
    const begin = this.selectedDateRange.start;
    const end = this.selectedDateRange.end;

    if (!airport || !begin || !end) {
      alert('Please select an airport and date range');
      return;
    }
    console.log(begin, end, airport);
   

    this.arrivalsService.getArrivals(airport, begin, end).subscribe(
      (data) => {
        console.log('Flights:', data);
      },
      (error) => {
        console.error('Error fetching flights:', error);
      }
    );
  }
}