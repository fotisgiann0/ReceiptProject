import { Component, EventEmitter, Input, OnInit, Output, Signal } from '@angular/core';
import { receiptLine } from '../../Interfaces/receiptLineInterface';
import { ListingInputComponent } from "../listing-input/listing-input.component";
import { IHistory } from '../../Interfaces/historyInterface';
import { IdentityService } from '../../services/Identity/identity.service';
import { CommonModule } from '@angular/common';
import { userIDService } from '../../services/Signals/userID';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [ListingInputComponent, CommonModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {

 
  @Input({
    required: true,
  }) itemList!: receiptLine[];

  @Input({
    required: false,
  }) paid_total!: number;
  
  @Input({
    required: false,
  }) receipt!: IHistory;

  rec_id = 0;
  @Input() receiptId!: number;
  
  formatter = new Intl.NumberFormat('default', {
    style: 'currency',
    currency: 'EUR',
  });
  
  @Output() itemList_emmitter = new EventEmitter<receiptLine[]>();

  @Output() paid_totalChange = new EventEmitter<number>();
  @Output() receiptChange = new EventEmitter<IHistory>();
  
  handleReset() {
    while(this.itemList.length > 0)
      this.itemList.pop();
    this.paid_total= 0;
    this.paid_totalChange.emit(this.paid_total);
  }

  emitItemAndHistoryLists() {
    const historyObject: IHistory = {
      receipt_id: this.rec_id,
      date: new Date().toISOString(),
      total: this.paid_total,
      user_id: this.userIdService.userIDSignal()!,
      lines: [...this.itemList]
    }

    this.receiptChange.emit(historyObject);

    this.itemList_emmitter.emit(this.itemList);
  }

  constructor(private identityService: IdentityService, private userIdService: userIDService) {
    this.rec_id = this.identityService.getNextId();
  }
}
