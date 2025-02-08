import { Component, Input } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  imports: [
    MatTableModule,
    MatPaginatorModule
  ],
  standalone: true
})
export class tableComponent {
  @Input() arrivals: any[] = [];
  displayedColumns: string[] = ['departure', 'callsign', 'distance'];
  dataSource = new MatTableDataSource(this.arrivals);

  ngOnChanges() {
    this.dataSource.data = this.arrivals;
  }
}
