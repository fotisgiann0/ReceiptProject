import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ListingInputComponent } from '../listing-input/listing-input.component';
import { registerObject } from '../../cashRegisterObject';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-receipt',
  standalone: true,
  imports: [ReactiveFormsModule, ListingInputComponent, PopupComponent],
  templateUrl: './receipt.component.html',
  styleUrl: './receipt.component.css'
})
export class ReceiptComponent {

  receiptForm = new FormGroup({
    user_id: new FormControl(''),
    body: new FormControl(''),
    price: new FormControl('',[
      Validators.pattern(/^\d+\.\d{2}$/)
    ]),
    quantity: new FormControl('',[
      Validators.pattern(/^\d+\.\d{3}$/)
    ]),
    amount: new FormControl('')
  })
  
  formsList: registerObject[] = [];
  showModal = false;
  paidTotal = 0;
  identity = 0;

  isPriceCorrect = true;
  isQuantityCorrect = true;
  isFormValid = true;
  
  handleFormSubmit() {
    if (!this.receiptForm.valid) {
      this.isFormValid = false;
      
    } else {
      this.isFormValid = true;
      const registerObjectFromForm: registerObject = {
        user_id: Number(this.receiptForm.value.user_id),
        id: this.identity++,
        body: this.receiptForm.value.body || '',
        price:  Number(this.receiptForm.value.price) || -1,
        quantity: Number(this.receiptForm.value.quantity) || -1,
        total: Number(this.receiptForm.value.amount) || -1,
      };
      
      let total_price = registerObjectFromForm.price * registerObjectFromForm.quantity;
      registerObjectFromForm.total = total_price;
      
      this.addInputToFormsList(registerObjectFromForm);
      this.updateTotal();
      this.receiptForm.reset();
    }
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
    }

  updateTotal() {
    let sumOfEntry = 0
    for(let entry of this.formsList) {
      sumOfEntry += entry.total
    }
    this.paidTotal =  sumOfEntry
  }


  // 2.345
  checkDecimal(digits: number){

    let price = document.getElementById("price")?.textContent;

    if(!price || price === undefined){
     let element_price =  document.getElementById("price")//?.style.borderColor = "red";
      element_price!.style.backgroundColor = "red";
      this.isPriceCorrect = false;
      return;
    }

    let strAfterSplit = price.split('.');
    if(strAfterSplit.length < 2 || strAfterSplit.length > 2){
      this.isPriceCorrect = false;
    }

    let decimalDigits = strAfterSplit[1];
    if(decimalDigits.length === digits){
      this.isPriceCorrect = true;
    }else{
      this.isPriceCorrect = false;
    }
    }

 }