import { Component, Input, Output, EventEmitter, OnDestroy, OnChanges, SimpleChanges, WritableSignal, signal, OnInit, InputSignal, input, Signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ListingInputComponent } from '../listing-input/listing-input.component';
import { receiptLine } from '../../Interfaces/receiptLineInterface';
import { PopupComponent } from '../popup/popup.component';
import { CommonModule } from '@angular/common';
import { SearchCatalogComponent } from '../search-catalog/search-catalog.component';
import { IHistory } from '../../Interfaces/historyInterface';
import { emit } from 'process';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { IdentityService } from '../../services/Identity/identity.service';
import { userIDService } from '../../services/Signals/userID';
import { lutimes } from 'fs';

@Component({
  selector: 'app-receipt',
  standalone: true,
  imports: [ReactiveFormsModule, ListingInputComponent, PopupComponent, CommonModule, SearchCatalogComponent],
  templateUrl: './receipt.component.html',
  styleUrl: './receipt.component.css'
})
export class ReceiptComponent {
  products:receiptLine[] = [];

  @Input() receiptSignal!: WritableSignal<IHistory>;


  @Input() userIDSignal!: Signal<number>;
  //userIDSignal: InputSignal<number> = input.required<number>();

  constructor(private route: ActivatedRoute, public idService: userIDService) {
  }
  
  @Input() receiptId!: number;

  @Output() receiptIdChange = new EventEmitter<number>();
  @Output() userIdSignalChange = new EventEmitter<number>();

  @Output() receiptChange = new EventEmitter<IHistory>();
  
  receiptForm = new FormGroup({
    user_id: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
    description: new FormControl('',/*[Validators.pattern('[a-zA-Z0-9 ]*') ,*/Validators.required),
    product_id: new FormControl(),
    price: new FormControl('',[
      Validators.pattern(/^\d+(\.\d{1,2})?$/), 
      Validators.required
    ]),
    quantity: new FormControl('',[
      Validators.pattern(/^\d+(\.\d{1,3})?$/), 
      Validators.required
    ]),
    amount: new FormControl(''),
    inventory: new FormControl('')
  })
  
  formatter = new Intl.NumberFormat('default', {
    style: 'currency',
    currency: 'EUR',
  });
  
  lines: receiptLine[] = [];
  showModal = false;
  paidTotal = 0;
  identity = 0;
  userIdGlobal = 1;

  prodIdGlobal = 0
  isFormValid = true;
  insufficientInventory = false;
  itemInventory = 0;

  handlePopupReceiptChange(updatedReceipt: IHistory){
    this.resetLines();
    this.receiptChange.emit(updatedReceipt);
  }

  handleFormSubmit() {
    const index = this.products.findIndex(item => item.description === this.receiptForm.value.description);

    console.log("Index from products:"+index);
    console.log("Products:");
    console.log(this.products);

    this.itemInventory = this.products[index].stock;
    const quantityRequested = Number(this.receiptForm.value.quantity);
    if(this.itemInventory < quantityRequested){
      this.insufficientInventory = true;
      return;
    }else if (this.receiptForm.valid){
      this.isFormValid = true;
      this.insufficientInventory = false;

      if(this.checkInput() === true){
        return;
      }
      
      const receiptLineFromForm: receiptLine = {
        user_id: this.idService.userIDSignal()!,//this.userIdGlobal,//Number(this.receiptForm.value.user_id),
        product_id: Number(this.receiptForm.value.product_id),
        description: this.receiptForm.value.description || '',
        price:  Number(this.receiptForm.value.price) ,
        quantity: Number(this.receiptForm.value.quantity) ,
        total: Number(this.receiptForm.value.amount) ,
        stock: Number(this.receiptForm.value.inventory)
      };
      
      this.products[index].stock -= quantityRequested;
      
      let total_price = receiptLineFromForm.price * receiptLineFromForm.quantity;
      total_price = Math.round(total_price * 100) / 100;
      receiptLineFromForm.total = total_price;
      
      this.addInputToLines(receiptLineFromForm);
      this.updateTotal();
      this.receiptForm.reset();
    }
  }
  
  fillFormAfterSearch(object: receiptLine): void{
    this.receiptForm.patchValue({
      user_id: object.user_id.toString(),
      description : object.description,
      product_id: object.product_id.toString(),
      price : object.price.toString(),
      quantity: '1',
      inventory: object.stock.toString()
    })
    this.insufficientInventory = false;
  }

  getProductList(object: receiptLine[]): void {
    this.products = object;
    console.log(this.products)
  }

  receiveListForHistory(object: receiptLine[]): void {
    console.log("in history function in receipts")
    console.log(object);
  }

  addInputToLines(register: receiptLine) {
    this.lines.push(register)
  }
  
  resetLines() {
    while(this.lines.length > 0)
      this.lines.pop();
    this.updateTotal();

    this.insufficientInventory = false;
    this.isFormValid = true;
  }

  resetForm(){
    this.insufficientInventory = false;
    this.receiptForm.reset();
  }

  updateTotal() {
    let sumOfEntry = 0
    for(let entry of this.lines) {
      if(this.lines.length !== 0) {
        sumOfEntry += entry.total!
      }
      
    }
    
    this.paidTotal = Math.round(sumOfEntry * 100) / 100;
  }

  checkInput(): boolean {
    const body = this.receiptForm.value.description
    const price = this.receiptForm.value.price
    for(let entry of this.lines) {
      if(body === entry.description && Number(price) === entry.price){
        entry.quantity += Number(this.receiptForm.value.quantity);
        entry.total = entry.quantity * entry.price;

        entry.total = Math.round(entry.total * 100) / 100;
        this.updateTotal();
        this.receiptForm.reset();
        return true;
      }    
    }
    return false;
  }
}