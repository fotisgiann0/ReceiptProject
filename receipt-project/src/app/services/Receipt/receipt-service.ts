import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InsertReceipt } from '../../Interfaces/insertReceiptInterface';
import { Receipt } from '../../Interfaces/receiptInterface';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService{

  constructor(private http: HttpClient) { }

  createReceiptPost(receipt: InsertReceipt){
    console.log("I am trying to call the api...");
    return this.http.post("https://localhost:7006/receipts/", receipt)
    .subscribe(data => {
      console.log(data);
    });
  }  
}