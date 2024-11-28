import { Injectable, signal } from '@angular/core'

@Injectable({providedIn: 'root'})
export class userIDService {
    userIDSignal = signal<number | null>(null);

    setID(id: number){
        this.userIDSignal.set(id);
    }
}