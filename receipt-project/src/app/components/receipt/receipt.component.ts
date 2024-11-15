import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ListingInputComponent } from '../listing-input/listing-input.component';
import { registerObject } from '../../cashRegisterObject';
import { MatDialog } from '@angular/material/dialog';
import { CustomModalComponent } from '../custom-modal/custom-modal.component';
@Component({
  selector: 'app-receipt',
  standalone: true,
  imports: [ReactiveFormsModule, ListingInputComponent, CustomModalComponent],
  templateUrl: './receipt.component.html',
  styleUrl: './receipt.component.css'
})
export class ReceiptComponent {

  receiptForm = new FormGroup({
    user_id: new FormControl(''),
    body: new FormControl(''),
    price: new FormControl(''),
    quantity: new FormControl(''),
    amount: new FormControl('')
  })
  formsList: registerObject[] = [];
  showModal = false;
  paidTotal = 0;
  identity = 0
  handleFormSubmit() {
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
 }