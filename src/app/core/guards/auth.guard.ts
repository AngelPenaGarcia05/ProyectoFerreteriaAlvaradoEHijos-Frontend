import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Inject, inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const userRole = authService.getUserRole();
  if (userRole === 'ADMIN') {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
