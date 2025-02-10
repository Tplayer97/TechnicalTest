import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const authData = authService.isAuthenticated(); // Check if the user is authenticated
    
  if (!authData) {
    router.navigate(['/login']); // Redirect unauthorized users to login page
    return false;
  }
     
  return true;
};
