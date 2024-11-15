import { Component, Output, Input, EventEmitter } from '@angular/core';
import { ReceiptComponent } from '../receipt/receipt.component';
import { registerObject } from '../../cashRegisterObject';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listing-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listing-input.component.html',
  styleUrl: './listing-input.component.css'
})
export class ListingInputComponent {
  @Input({
    required: true
  }) listing_body!: registerObject;

  @Input({
    required: true,
  }) formsList!: registerObject[];
  
  deleteRow(i: number){
    let index = this.formsList.findIndex(item => item.id === i);
    this.formsList.splice(index,1);
  }
}
