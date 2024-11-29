import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../Interfaces/productInterface';
import { receiptLine } from '../../Interfaces/receiptLineInterface';

@Injectable({
  providedIn: 'root'
})
export class ChangeStockService {

  constructor(private http: HttpClient) { }

  changeStock(product_id: number, items:number, product: receiptLine) {
    return this.http.put<Product>(`https://localhost:7006/products/${product_id}/inventory/${items}`, product)
  }
}
