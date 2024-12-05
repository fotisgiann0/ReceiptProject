import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InsertReceipt } from '../../Interfaces/insertReceiptInterface';
import { Receipt } from '../../Interfaces/receiptInterface';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService{

  constructor(private http: HttpClient) { }

  createReceiptPost(receipt: InsertReceipt){
    return this.http.post("https://localhost:7006/receipts/", receipt)
    .subscribe(data => {
      console.log(data);
    });
  }  
}