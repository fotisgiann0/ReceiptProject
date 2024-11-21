import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ListingInputComponent } from '../listing-input/listing-input.component';
import { registerObject } from '../../cashRegisterObject';
import { PopupComponent } from '../popup/popup.component';
import { CommonModule } from '@angular/common';
import { SearchCatalogComponent } from '../search-catalog/search-catalog.component';


@Component({
  selector: 'app-receipt',
  standalone: true,
  imports: [ReactiveFormsModule, ListingInputComponent, PopupComponent, CommonModule, SearchCatalogComponent],
  templateUrl: './receipt.component.html',
  styleUrl: './receipt.component.css'
})
export class ReceiptComponent {

  
  receiptForm = new FormGroup({
    user_id: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
    description: new FormControl('',/*[Validators.pattern('[a-zA-Z0-9 ]*') ,*/Validators.required),
    price: new FormControl('',[
      Validators.pattern(/^\d+(\.\d{1,2})?$/), 
      Validators.required
    ]),
    quantity: new FormControl('',[
      Validators.pattern(/^\d+(\.\d{1,3})?$/), 
      Validators.required
    ]),
    amount: new FormControl('')
  })
  
  formatter = new Intl.NumberFormat('default', {
    style: 'currency',
    currency: 'EUR',
  });
  
  formsList: registerObject[] = [];
  showModal = false;
  paidTotal = 0;
  identity = 0;
  userIdGlobal = 1;

  isFormValid = true;

  handleFormSubmit() {
    if (!this.receiptForm.valid) {
      
    } else {
      this.isFormValid = true;

      if(this.checkInput() === true){
        return;
      }
      
      const registerObjectFromForm: registerObject = {
        user_id: this.userIdGlobal,//Number(this.receiptForm.value.user_id),
        product_id: this.identity++,
        description: this.receiptForm.value.description || '',
        price:  Number(this.receiptForm.value.price) ,
        quantity: Number(this.receiptForm.value.quantity) ,
        total: Number(this.receiptForm.value.amount) ,
      };
      
      let total_price = registerObjectFromForm.price * registerObjectFromForm.quantity;
      total_price = Math.round(total_price * 100) / 100;
      registerObjectFromForm.total = total_price;
      
      this.addInputToFormsList(registerObjectFromForm);
      this.updateTotal();
      this.receiptForm.reset();
    }
  }
  
  fillFormAfterSearch(object: registerObject): void{
    this.receiptForm.patchValue({
      user_id: object.user_id.toString(),
      description : object.description,
      price : object.price.toString(),
      quantity: '1'
    })
  }

  postForm(body: string | null | undefined){
    console.log(`Data from the input${body}`);
  }

  addInputToFormsList(register: registerObject) {
    this.formsList.push(register)
  }
  
  handleReset() {
    while(this.formsList.length > 0)
      this.formsList.pop();
    this.updateTotal();

    this.isFormValid = true;
  }

  handleResetForm(){
    this.receiptForm.reset();
  }

  updateTotal() {
    let sumOfEntry = 0
    for(let entry of this.formsList) {
      if(this.formsList.length !== 0) {
        sumOfEntry += entry.total!
      }
      
    }
    
    this.paidTotal = Math.round(sumOfEntry * 100) / 100;
  }


  // 2.345
  // checkDecimal(digits: number){
  //     let price = document.getElementById("price")?.textContent;

  //     if(!price || price === undefined){
  //     let element_price =  document.getElementById("price")//?.style.borderColor = "red";
  //       element_price!.style.backgroundColor = "red";
  //       this.isPriceCorrect = false;
  //       return;
  //     }

  //     let strAfterSplit = price.split('.');
  //     if(strAfterSplit.length < 2 || strAfterSplit.length > 2){
  //       this.isPriceCorrect = false;
  //     }

  //     let decimalDigits = strAfterSplit[1];
  //     if(decimalDigits.length === digits){
  //       this.isPriceCorrect = true;
  //     }else{
  //       this.isPriceCorrect = false;
  //     }
  // }

  checkInput(): boolean {
    const body = this.receiptForm.value.description
    const price = this.receiptForm.value.price
    for(let entry of this.formsList) {
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