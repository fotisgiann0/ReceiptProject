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
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    
    console.log("I am trying to call the api...");
    return this.http.post("https://localhost:7006/receipts/", receipt, {headers})
    .subscribe(data => {
      console.log(data);
    });
  }  
}