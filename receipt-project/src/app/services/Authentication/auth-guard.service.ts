import { Injectable, signal } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Employee } from '../../Interfaces/employeeInterface';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  currentUserSignal = signal<Employee | undefined | null>(undefined);

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('authToken');
    if (token) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

