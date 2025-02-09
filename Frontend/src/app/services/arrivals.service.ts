import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ArrivalsService {
  private apiUrl = 'http://localhost:9000/api/arrivals'; // we are going to use this variable to store the URL of the API from the backend to fetch the data.

  constructor(private http: HttpClient) {
  }

  async getArrivals(airport: string, begin: number, end: number): Promise<any> {
    let data = null;
    const url = `${this.apiUrl}?airport=${airport}&begin=${begin}&end=${end}`;
    // we are going to use this function to send a get request to the API and fetch the data to display it in the frontend    
    try {
     
      const response = await firstValueFrom(this.http.get<any>(url)); // we are going to use the firstValueFrom function to get the first value from the observable and transform it into a promise, then we are going to return it
      // Extract the correct key if response is wrapped
      if (response?.source && response.source?.source) {
         data = response.source.source; 
      }
       data = response;
        
    } catch (error) {
      console.error("Error:", error);
      alert('Error fetching arrivals');
      throw error;
    }
     
    return data;
  }

}
