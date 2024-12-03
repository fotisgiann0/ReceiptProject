import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserTokenSignal = signal<string | undefined | null>(undefined);
}