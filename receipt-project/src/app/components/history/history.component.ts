import { Component, Input, OnInit } from '@angular/core';
import { receiptLine } from '../../receiptLineInterface';
import { IHistory } from '../../historyInterface';
import { listenerCount } from 'process';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit {
  @Input({
    required: true,
  }) historyList:receiptLine[] = [];
  
  @Input({
    required: true,
  }) receipts: IHistory[] = [];

  historyListCount = 0;
  identity = 0;
  totalHistory: IHistory[] = [];

  ngOnInit(): void {
    const listToAdd = []
    for(let i = this.historyListCount; i < this.historyList.length; i++) {
      listToAdd.push(this.historyList[i]);
    }
    const historyObject = {
      receipt_id: this.identity++,
      date: "" 
      list: listToAdd
    }
    // receipt_id: number,
    // date: string,
    // total: number,
    // user_id: number,
    this.totalHistory[this.identity]["lines"].push(historyObject);
    // while(this.historyList.length > 0)
    //   this.historyList.pop();
    //count anti gia pop
    this.historyListCount = this.historyListCount + this.historyList.length
    this.identity += 1;
    console.log(this.historyList);
  }
}
