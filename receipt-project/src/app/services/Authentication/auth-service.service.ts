import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserTokenSignal = signal<string | undefined | null>(undefined);

  // session:any
  // constructor(private http: HttpClient) {
  //   let session = localStorage.getItem('session');
  //   if(session) {
  //     this.session = JSON.parse(session);
  //   }

  // }
  logout() {
    console.log("logging out")
    //this.session = undefined;
    //localStorage.removeItem('session');
    localStorage.setItem('token', '');
    this.currentUserTokenSignal.set(null)
  }
}