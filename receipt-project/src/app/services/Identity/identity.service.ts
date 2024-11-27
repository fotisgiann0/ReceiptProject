import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Makes the service available application-wide
})
export class IdentityService {
  private currentId = 0; // Initial value

  constructor() {}

  // Method to get the next ID
  getNextId(): number {
    this.currentId++;
    return this.currentId;
  }
}