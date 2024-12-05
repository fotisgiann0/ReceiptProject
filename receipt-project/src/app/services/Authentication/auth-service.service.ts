import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserTokenSignal = signal<string | undefined | null>(undefined);

  logout() {
    console.log("logging out")
    //this.session = undefined;
    //localStorage.removeItem('session');
    localStorage.setItem('token', '');
    this.currentUserTokenSignal.set(null)
  }
}