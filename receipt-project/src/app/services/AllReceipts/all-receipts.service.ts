import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Receipt } from '../../Interfaces/receiptInterface';
import { Observable } from "rxjs";
import { FullReceipt } from '../../Interfaces/fullReceiptInterface';

@Injectable({
  providedIn: 'root'
})
export class AllReceiptsService {

  constructor(private http: HttpClient) { }

  getReceipts(): Observable<FullReceipt[]>{
    // const token = localStorage.getItem('authToken');

    // const headers = new HttpHeaders({
    //   Authorization: `Bearer ${token}`,
    // });

    return this.http.get<FullReceipt[]>("https://localhost:7006/receipts/");
}
}
