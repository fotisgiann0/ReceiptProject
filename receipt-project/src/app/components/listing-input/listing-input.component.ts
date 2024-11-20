import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { ReceiptComponent } from '../receipt/receipt.component';
import { registerObject } from '../../cashRegisterObject';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listing-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listing-input.component.html',
  styleUrl: './listing-input.component.css'
})
export class ListingInputComponent{
  // @Input({
  //   required: true
  // }) listing_body!: registerObject;

  @Input({
    required: true,
  }) buttonFLag: boolean =true;

  @Input({
    required: true,
  }) formsList!: registerObject[];

  @Input() paid_Total!: number;

  @Output() paid_TotalChange = new EventEmitter<number>();

  deleteRow(i: number){
    let index = this.formsList.findIndex(item => item.id === i);
    this.formsList.splice(index,1);
    let sumEntries = 0;
    for(let entry of this.formsList) {
      sumEntries += entry.total
    }
    this.paid_Total= sumEntries;
    this.paid_TotalChange.emit(this.paid_Total);
  }
}
