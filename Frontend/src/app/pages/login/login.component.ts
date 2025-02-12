import { Component, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],

})
export class LoginComponent {
  hidePassword = true;
  isLoading = false; // we are going to use this variable block the input when the user is logging in
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private loginService: LoginService, private router: Router, private cdRef: ChangeDetectorRef) { }

  login() {
    if (this.loginForm.valid) {
      this.isLoading = true;  // we are going to use this variable to block the input when the user is logging in
      this.cdRef.detectChanges(); // we are going to use this function to force the change detection to update the view
      const { email, password } = this.loginForm.value;
      this.loginService.login(email!, password!).subscribe({
        next: () => this.router.navigate(['home']),
        error: (error) => {
          alert('Invalid credentials')
          this.isLoading = false; // we are going to use this variable to enable the input fields
        },
      });
    }
  }

}
