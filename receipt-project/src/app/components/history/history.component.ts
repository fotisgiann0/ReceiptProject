import { Component, Input, OnInit } from '@angular/core';
import { receiptLine } from '../../Interfaces/receiptLineInterface';
import { IHistory } from '../../Interfaces/historyInterface';
import { listenerCount } from 'process';
import { CommonModule } from '@angular/common';
import { PopupComponent } from '../popup/popup.component';
import { HistoryPopupComponent } from '../history-pop-up/history-pop-up.component';
import { ListingInputComponent } from "../listing-input/listing-input.component";

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, ListingInputComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent  {
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