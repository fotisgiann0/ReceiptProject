import { Component, Input, OnInit } from '@angular/core';
import { receiptLine } from '../../receiptLineInterface';
import { IHistory } from '../../historyInterface';
import { listenerCount } from 'process';
import { CommonModule } from '@angular/common';
import { PopupComponent } from '../popup/popup.component';
import { HistoryPopupComponent } from '../history-pop-up/history-pop-up.component';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, HistoryPopupComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent  {
  @Input({
    required: true,
  }) historyList:IHistory[] = [];
}