import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { ReceiptComponent } from '../receipt/receipt.component';
import { receiptLine } from '../../Interfaces/receiptLineInterface';
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
  @Input({
    required: true,
  }) buttonFLag: boolean =true;

  @Input({
    required: true,
  }) lines!: receiptLine[];

  @Input() paid_Total!: number;

  @Output() paid_TotalChange = new EventEmitter<number>();

  deleteRow(i: number){
    let index = this.lines.findIndex(item => item.product_id === i);
    this.lines.splice(index,1);
    let sumEntries = 0;
    for(let entry of this.lines) {
      sumEntries += entry.total!
    }
    this.paid_Total= sumEntries;
    this.paid_TotalChange.emit(this.paid_Total);
  }
}
