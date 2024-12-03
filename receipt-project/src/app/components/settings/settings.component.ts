import { Component, inject, Input, OnInit } from '@angular/core';
import { receiptLine } from '../../Interfaces/receiptLineInterface';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/Products/products';
import { map } from 'rxjs/operators';
import { ChangeStockService } from '../../services/Products/change-stock.service';
import { AuthGuard } from '../../services/Authentication/auth-guard.service';
import { AuthService } from '../../services/Authentication/auth-service.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {  
  products:receiptLine[] = [];

  authService = inject(AuthService);
  settingsForm!: FormGroup;

  updatedStocks: { [key: number]: number } = {};
  errorval = false;
  
  constructor(private productService: ProductsService, private stockService: ChangeStockService){
    
  }

  ngOnInit(): void {
    let i = 0;

    this.productService.getProducts()
    .pipe(
      map(products => products.filter(p => i++ < 10))
    )
    .subscribe(productsArray => {
      productsArray.forEach(product =>{
        const newLineProduct: receiptLine = {
          user_id: 0,
          quantity: 0,
          total: 0,
          product_id: product.productId,
          description: product.prodDescription,
          price: product.price,
          stock: product.inventory
        };

        this.products.push(newLineProduct);
      })
    })
  }
  
  onStockChange(index: number, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const parsedValue = parseInt(inputElement.value, 10);
    if(parsedValue >= 0 && parsedValue <= 1000 ) {
      if (!isNaN(parsedValue)) {
        this.updatedStocks[index] = parsedValue;
      } else {
        delete this.updatedStocks[index];
      }
      this.errorval = false;
    }
    else {
      this.errorval = true;
      console.log("invalid stock");
    }
  }

  updateInvetory():void{
    for (const index in this.updatedStocks) {
      if (this.updatedStocks.hasOwnProperty(index)) {

        console.log(this.products[index]);
        

        this.stockService.changeStock(
          this.products[index].product_id, 
          this.updatedStocks[index] - this.products[index].stock, 
          this.products[index])
          .subscribe(product => 
            console.log(product)
          );
        this.products[index].stock = this.updatedStocks[index];
      }
    }
    console.log('Updated Products:', this.products);
    this.updatedStocks = {}
  }

}