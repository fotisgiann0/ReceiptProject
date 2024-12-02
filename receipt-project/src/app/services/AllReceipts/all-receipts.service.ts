import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Receipt } from '../../Interfaces/receiptInterface';
import { Observable } from "rxjs";
import { FullReceipt } from '../../Interfaces/fullReceiptInterface';

@Injectable({
  providedIn: 'root'
})
export class AllReceiptsService {

  constructor(private http: HttpClient) { }

  getReceipts(): Observable<FullReceipt[]>{
    return this.http.get<FullReceipt[]>("https://localhost:7006/receipts/");
}
}
