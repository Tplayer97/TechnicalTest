import { Component, ViewChild, ChangeDetectorRef, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule, MatDateRangePicker, MatDateRangeInput } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { ArrivalsService } from '../../services/arrivals.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatDateRangePicker,
    MatDateRangeInput,
    MatProgressSpinnerModule,
  ],
  templateUrl: './searchbar.component.html'
})
export class searchbarComponent {

  @Output() arrivalsFound: EventEmitter<any[]> = new EventEmitter<any[]>(); // we are going to use this event emitter to send the data to the parent component so that it can send it to the sibling component table to display it
  @ViewChild(MatDateRangePicker, { static: false }) picker!: MatDateRangePicker<Date>;
  isLoading = false; // we are going to use this variable to show a loading spinner when the user is fetching the data from the API and to disable the input fields
  form = new FormGroup({
    selectedAirport: new FormControl(''),
    selectedDateRange: new FormGroup({
      begin: new FormControl(null),
      end: new FormControl(null)
    })
  });

  airports = [
    { code: 'LEZL', name: "Seville Airport" },
    { code: 'EDDF', name: "Frankfurt am Main Airport" },
    { code: 'LEMD', name: 'Adolfo Suárez Madrid-Barajas Airport' }
  ];


  constructor(private arrivalsService: ArrivalsService, private overlayContainer: OverlayContainer, private cdRef: ChangeDetectorRef) {
  }

  async fetchFlights() {
  
    const airport = this.form.get('selectedAirport')?.value;
    const beginDate: Date | null = this.form.get('selectedDateRange.begin')?.value ?? null;
    const endDate = this.form.get('selectedDateRange.end')?.value ?? null;
   
    if (!airport || (beginDate === null && !beginDate) || (endDate === null && !endDate)) {
      return; // if any of the parameters is missing we are going to return and not proceed with the service
    }
    else {
      // if all the parameters are correct we are going to divide both timestamps by 1000 because getTime() returns a timestamp in milliseconds and the API is expecting them in seconds, we wait to divide them until this point to avoid dividing them if the user didn't select a date
      const begin = Math.floor((beginDate as Date).getTime() / 1000); // we use TypeScript assertions to tell the compiler that the value is not null because we already checked for it
      let end = Math.floor((endDate as Date).getTime() / 1000 + 86400); // we add 86400 seconds to the end date to get the flights from the whole day
      const timestampOfNow = Math.floor(new Date().getTime() / 1000); // we are going to use this timestamp to check if the user is trying to fech data from the future
      if (end - begin > 604801) {
        alert('You can only fetch data for a maximum of 7 days'); // According to the API documentation we can only fetch data for a maximum of 7 days, so we will prevent it here and inform the user
        return;
      }
      else if (begin > timestampOfNow) {// if begin is greater than the current timestamp we are going to prevent the user from fetching data from the future and inform him
        alert('You can only fetch data from the past'); // we are going to prevent the user from fetching data from the future and inform him
        return;
      }
      else{
        if(end > timestampOfNow ){
          end = timestampOfNow; 
          alert('The end date cannot be in the future, setting it to the current time'); // we are going to prevent the user from fetching data from the future by setting the end to the current time and inform him
        }
        this.isLoading = true; //here we disable the input fields and show the loading spinner
        this.cdRef.detectChanges(); // we are going to use this function to force the change detection to update the view and show the loading spinner
        try {
          const data = await this.arrivalsService.getArrivals(airport, begin, end);
          this.arrivalsFound.emit(data); // we are going to emit the data to the parent component to display it in the table
          console.log('Api Response:', data);
        } catch (error) {
          console.error('Error fetching arrivals:', error);
        }
        this.isLoading = false; // here we enable the input fields and hide the loading spinner
      }
    }
  }

  pickerClose() {
    if (this.picker) {
      this.overlayContainer.getContainerElement().innerHTML = ''; // for some reason picker.close() doesn't work and I have to manually remove the overlay, maybe it's not the cleanest way to do it but it gets the job done 
    }
  }
}