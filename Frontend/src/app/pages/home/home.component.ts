import { Component } from '@angular/core';
import { SearchbarComponent } from '../../components/searchbarComponent/searchbar.component';
import { TableComponent } from '../../components/tableComponent/table.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    SearchbarComponent,
    TableComponent,
  ]
})
export class HomeComponent {
  arrivals: any[] = [];

  updateArrivals(arrivals: any[]) {
    this.arrivals = arrivals;
  }
}