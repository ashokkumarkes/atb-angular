import { inject, Injectable } from '@angular/core';

import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
    // const isLoggedIn = !!localStorage.getItem('token');
    const isLoggedIn = sessionStorage.getItem('token');
    if (!isLoggedIn) {
      const router = inject(Router);
      router.navigate(['/login']);
      return false;
    }
    return true;
};

export const guestGuard: CanActivateFn = (route, state) => {
  // const isLoggedIn = !!localStorage.getItem('token');
  const isLoggedIn = sessionStorage.getItem('token');
  if (isLoggedIn) {
    const router = inject(Router);
    router.navigate(['/admin/dashboard']); // or dashboard
    return false;
  }
  return true;
};
