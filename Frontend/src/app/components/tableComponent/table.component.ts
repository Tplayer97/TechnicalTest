import {  Component, Input, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginator,
    MatSort,
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatSortModule,
    MatPaginatorModule
  ],

})
export class tableComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator; // we are going to use this variable to paginate the data in the table
  @ViewChild(MatSort) sort!: MatSort; // we are going to use this variable to sort the data in the table
  @Input() arrivals: any[] = []; // this variable is going to store the data that we are going to display in the table

  dataSource = new MatTableDataSource(this.arrivals);

  // here we store the labels of the columns that we are going to display in the table 
  columnLabels: { [key: string]: string } = {
    estDepartureAirportHorizDistance: 'distance',
    callsign: 'callsign',
    estDepartureAirport: 'departure',
  };
  allColumns: string[] = ['estDepartureAirport', 'callsign', 'estDepartureAirportHorizDistance'];
  displayedColumns: string[] = ['estDepartureAirport', 'callsign', 'estDepartureAirportHorizDistance'];



    constructor() {
    }

    ngOnChanges() {
      this.dataSource.data = this.arrivals;
    }
    ngOnInit() {}

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
}
