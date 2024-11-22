import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { receiptLine } from '../../receiptLineInterface';
import { ListingInputComponent } from "../listing-input/listing-input.component";

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [ListingInputComponent],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {

  @Input({
    required: true,
  }) itemList!: receiptLine[]; //isws me = []

  @Input() paid_total!: number;
  @Input() historyList!: receiptLine[];

  formatter = new Intl.NumberFormat('default', {
    style: 'currency',
    currency: 'EUR',
  });
  
  @Output() itemList_emmitter = new EventEmitter<receiptLine[]>();

  @Output() paid_totalChange = new EventEmitter<number>();
  @Output() historyListChange = new EventEmitter<receiptLine[]>();
  
  handleReset() {
    while(this.itemList.length > 0)
      this.itemList.pop();
    this.paid_total= 0;
    this.paid_totalChange.emit(this.paid_total);
  }

  emitItemAndHistoryLists() {
    for(let entry of this.itemList) {
      this.historyList.push(entry);
    }
    this.itemList_emmitter.emit(this.itemList);
    this.historyListChange.emit(this.historyList);
  }
}
