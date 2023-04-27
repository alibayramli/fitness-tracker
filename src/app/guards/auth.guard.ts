import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const isLoggedInAuthGuard = () => {
  return inject(AuthService).isLoggedIn$;
};
