import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { registerObject } from '../../cashRegisterObject';
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
  }) itemList!: registerObject[]; //isws me = []

  @Input() paid_total!: number;

  formatter = new Intl.NumberFormat('default', {
    style: 'currency',
    currency: 'EUR',
  });
  
  @Output() itemList_emmitter = new EventEmitter<registerObject[]>();

  @Output() paid_totalChange = new EventEmitter<number>();
  
  handleReset() {
    while(this.itemList.length > 0)
      this.itemList.pop();
    this.paid_total= 0;
    this.paid_totalChange.emit(this.paid_total);
  }

  emitItemList() {
    this.itemList_emmitter.emit(this.itemList);
  }
}
