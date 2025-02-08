import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ArrivalsService {
  private apiUrl = 'http://nginx:9000/api/arrivals';

  constructor(private http: HttpClient) {}

  getArrivals(airport: string, begin: string, end: string): Observable<any> {
    // we are going to use this function to send a get request to the API and fetch the data to display it in the frontend
    return this.http.get(`${this.apiUrl}?airport=${airport}&begin=${begin}&end=${end}`);
  }
}