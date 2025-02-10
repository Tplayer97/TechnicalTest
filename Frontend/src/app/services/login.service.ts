import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:9000/api/login';

  constructor(private http: HttpClient) {}
  // We are going to use this service to log in and log out users.
  //  The login method sends a POST request to the /api/login endpoint with the email and password as the request body. If the request is successful, the token is stored in the session storage. 
  login(email: string, password: string): Observable<any> { 
    return this.http.post<{ token: string }>(this.apiUrl, { email, password }).pipe(
      tap((response) => {
        sessionStorage.setItem('jwt_token', response.token);
      })
    );
  }
  // The logout method removes the token from the session storage. 
  logout() {
    sessionStorage.removeItem('jwt_token');
  }
  //The isAuthenticated method checks if the token is stored in the session storage and returns a boolean value.
  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('jwt_token');
  }
}