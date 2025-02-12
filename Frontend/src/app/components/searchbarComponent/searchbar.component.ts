import { Component, ViewChild, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule, MatDateRangePicker, MatDateRangeInput } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { ArrivalsService } from '../../services/arrivals.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatetimepickerModule, MatNativeDatetimeModule } from '@mat-datetimepicker/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
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
    MatDatepickerModule,
    MatDatetimepickerModule,
    MatNativeDatetimeModule
  ],
})

export class SearchbarComponent {

  @Output() arrivalsFound: EventEmitter<any[]> = new EventEmitter<any[]>(); // we are going to use this event emitter to send the data to the parent component so that it can send it to the sibling component table to display it
  @ViewChild(MatDateRangePicker, { static: false }) picker!: MatDateRangePicker<Date>;
  isLoading = false; // we are going to use this variable to show a loading spinner when the user is fetching the data from the API and to disable the input fields
  form = new FormGroup({
    selectedAirport: new FormControl('', [Validators.required]),
    selectedDateRange: new FormGroup({
      begin: new FormControl(null),
      end: new FormControl(null)
    }, [this.dateValidator, this.sevenDaysValidator])
  });

  airports = [ // we are going to use this array to store the airports that the user can select
    { code: 'LEZL', name: "Seville Airport" },
    { code: 'EDFH', name: "Frankfurt Hahn Airport" },
    { code: 'LEAS', name: 'Asturias Airport' }
  ];


  constructor(private arrivalsService: ArrivalsService, private overlayContainer: OverlayContainer, private cdRef: ChangeDetectorRef) {
  }

  sevenDaysValidator(control: AbstractControl): ValidationErrors | null {
    const beginDate = control.get('begin')?.value; // Get begin date
    const endDate = control.get('end')?.value; // Get end date
    if ((beginDate !== null) && (endDate !== null)) { // we can only validate if we have both dates
      const begin = Math.floor((beginDate as Date).getTime() / 1000); // we use TypeScript assertions to tell the compiler that the value is not null because we already checked for it
      let end = Math.floor((endDate as Date).getTime() / 1000 + 86400); // we add 86400 seconds to the end date to get the flights from the whole day
      if (end - begin > 604801) { // there is more than 7 days between begin and end 
        control.get('end')?.setErrors({ moreThanSevenDays: true }) // this should never be null at this point and we need to set the error to one input because the error message needs to be attached to a single input to be displayed
        return { moreThanSevenDays: true }; // Custom error
      }
    }
    return null;
  }

  dateValidator(control: AbstractControl): ValidationErrors | null {
    const beginDate = control.get('begin')?.value; // Get begin date
    if (beginDate !== null) { // we can only validate if we have both dates
      const timestampOfNow = Math.floor(new Date().getTime() / 1000);
      const begin = Math.floor((beginDate as Date).getTime() / 1000); // we use TypeScript assertions to tell the compiler that the value is not null because we already checked for it
      if (begin > timestampOfNow) {
        control.get('end')?.setErrors({ dateInTheFuture: true }) // this should never be null at this point and we need to set the error to one input because the error message needs to be attached to a single input to be displayed
        return { dateInTheFuture: true }; // Custom error
      }
    }
    return null;
  }

  fetchFlights() {
    const airport = this.form.get('selectedAirport')?.value;
    const beginDate: Date | null = this.form.get('selectedDateRange.begin')?.value ?? null;
    const endDate = this.form.get('selectedDateRange.end')?.value ?? null;

    if (airport && beginDate !== null && endDate !== null && !this.form.get('selectedDateRange.end')?.hasError('dateInTheFuture') && !this.form.get('selectedDateRange.end')?.hasError('moreThanSevenDays')) {// if all the parameters are correct we are going to divide both timestamps by 1000 because getTime() returns a timestamp in milliseconds and the API is expecting them in seconds, we wait to divide them until this point to avoid dividing them if the user didn't select a date
      const begin = Math.floor((beginDate as Date).getTime() / 1000); // we use TypeScript assertions to tell the compiler that the value is not null because we already checked for it
      let end = Math.floor((endDate as Date).getTime() / 1000 + 86400); // we add 86400 seconds to the end date to get the flights from the whole day
      const timestampOfNow = Math.floor(new Date().getTime() / 1000); // we are going to use this timestamp to check if the user is trying to fech data from the future
      if (end > timestampOfNow) end = timestampOfNow;  // we are going to prevent the user from fetching data from the future by setting the end to the current time

      this.isLoading = true;
      this.cdRef.detectChanges();

      this.arrivalsService.getArrivals(airport, begin, end).subscribe({
        next: (data: any[]) => {
          this.arrivalsFound.emit(data);
          this.form.get('selectedAirport')?.setValue('');
          this.form.get('selectedDateRange.begin')?.setValue(null);
          this.form.get('selectedDateRange.end')?.setValue(null);
          this.isLoading = false;
        },
        error: (error) => {
          console.log(error)
          alert(error[0]);
          this.arrivalsFound.emit([]); // if there is an error we clear the data from the table 
          this.isLoading = false;
        },
      });
    }
  }

  pickerClose() {
    if (this.picker) {
      this.overlayContainer.getContainerElement().innerHTML = ''; // for some reason picker.close() doesn't work and I have to manually remove the overlay, maybe it's not the cleanest way to do it but it gets the job done 
    }
  }
}