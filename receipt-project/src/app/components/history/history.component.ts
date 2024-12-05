import { Component, inject, Input, OnInit } from '@angular/core';
import { receiptLine } from '../../Interfaces/receiptLineInterface';
import { IHistory } from '../../Interfaces/historyInterface';
import { listenerCount } from 'process';
import { CommonModule } from '@angular/common';
import { PopupComponent } from '../popup/popup.component';
import { HistoryPopupComponent } from '../history-pop-up/history-pop-up.component';
import { ListingInputComponent } from "../listing-input/listing-input.component";
import { AllReceiptsService } from '../../services/AllReceipts/all-receipts.service';
import { map } from 'rxjs';
import { Lines } from '../../Interfaces/linesInterface';
//import { AuthGuard } from '../../services/Authentication/auth-guard.service';
import { AuthService } from '../../services/Authentication/auth-service.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, ListingInputComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit {
  constructor(private allReceiptsService: AllReceiptsService){}
  authService = inject(AuthService);
  ngOnInit(): void {
    this.historyList = []
    let i = 0;
    this.allReceiptsService.getReceipts()
    .pipe(
      map(receipts => receipts.filter(p => i++ < 30))
    )
    .subscribe(receiptArray => {
      receiptArray.forEach(receipt => {
        console.log(receipt)
       let lines: receiptLine[] = []
       receipt.receiptLines.forEach(receiptlines => {
        const newLine: receiptLine = {
          user_id: receipt.empId,
          quantity: receiptlines.quantity,
          total: ((receiptlines.fpa + 100) * receiptlines.freight * receiptlines.quantity) / 100,  
          product_id: receiptlines.productId,
          description: receiptlines.productId.toString(),
          price: receiptlines.freight,
          stock: 0
        }
        lines.push(newLine)
       })
        const newReceipt: IHistory = {
          receipt_id: receipt.orderId,
          date: receipt.recTime,
          total: receipt.totalCost,
          user_id: receipt.empId,
          lines: lines
          
        }
        console.log(newReceipt);
        this.historyList.push(newReceipt);
      })
    })
    console.log(this.historyList)
 
  }

  @Input({
    required: true,
  }) historyList:IHistory[] = [];

  indexForShow = 0;
  details: boolean = false;

  showDetails(index: number) {
    this.details = true;
    this.indexForShow = index;
  }
  cleanUp() {
    this.details = false;
  }
}