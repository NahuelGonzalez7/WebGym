import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './Core/user.service';


export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  const isLoged = userService.isLoggedIn();
  if(!isLoged) router.navigate(["/landing"]);
  return true;
};