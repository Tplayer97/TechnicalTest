import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ArrivalsService {
  private apiUrl = 'http://localhost:9000/api/arrivals'; // we are going to use this variable to store the URL of the API from the backend to fetch the data.

  constructor(private http: HttpClient, private authService: AuthService) { }

  getArrivals(airport: string, begin: number, end: number): Observable<any> {
    const url = `${this.apiUrl}?airport=${airport}&begin=${begin}&end=${end}`;
    // we are going to use this function to send a get request to the API and fetch the data to display it in the frontend    
    try {
      const token = this.authService.getToken(); // we retrieve the token we have stored
      return this.http.get<any[]>(url, { headers: new HttpHeaders(token ? { Authorization: `Bearer ${token}` } : {}) });// and we attach it to the headers on the request
    } catch (error) {
      throw error;
    }
  }

}
