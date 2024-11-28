import { Component, computed, Input, OnInit, Output, WritableSignal, signal, EventEmitter } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CompHeaderComponent } from "../comp-header/comp-header.component";
import { CompMenuComponent } from "../comp-menu/comp-menu.component";
import { CompFooterComponent } from "../comp-footer/comp-footer.component";
import { ReceiptComponent } from '../receipt/receipt.component';
import { ListingInputComponent } from '../listing-input/listing-input.component';
import { PopupComponent } from '../popup/popup.component';
import { receiptLine } from '../../Interfaces/receiptLineInterface';
import { SearchCatalogComponent } from '../search-catalog/search-catalog.component';
// import data from '../../data/products.json';
import receipts from '../../data/receipts.json'
import { SettingsComponent } from '../settings/settings.component';
import { HistoryComponent } from '../history/history.component';
import { IHistory } from '../../Interfaces/historyInterface';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { ActivatedRoute } from '@angular/router';
import { Receipt } from '../../Interfaces/receiptInterface';
import { InsertReceipt } from '../../Interfaces/insertReceiptInterface';
import { insertReceiptLine } from '../../Interfaces/insertReceiptLineInterface';
import { ReceiptService } from '../../services/Receipt/receipt-service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CompHeaderComponent, CompMenuComponent, CompFooterComponent, RouterOutlet, HttpClientModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  userIDSignal = signal<number>(0);
 // userIDSignal: InputSignal<number> = input.required<number>();
  // public data: any;
  // products: receiptLine[] = data;
  
  historyList: IHistory[] = [];

  receiptId = 0;
  historyListLengthSignal = computed(() => this.historyList.length);
  
  receiptSignal = signal<IHistory>({
    receipt_id: -1,
    date: "2024-11-22 15:30:00",
    total: 0,
    user_id: 0,
    lines: [
      {
        user_id: 0,
        product_id: 0,
        description: "null",
        price: 0,
        quantity: 0,
        total: 0,
        stock: 0,
      },
    ],
  });
  constructor(private http: HttpClient, private route: ActivatedRoute, private rec: ReceiptService) {
  }

  ngOnInit() {
    // Fetch the query parameter
    this.route.queryParams.subscribe(params => {
      const id = Number(params['user_id']);
      if (!isNaN(id)) {
        this.userIDSignal.set(id);
      }
    });
  }
    
  onOutletLoaded(component: ReceiptComponent | SearchCatalogComponent | SettingsComponent | HistoryComponent) {
    if(component instanceof HistoryComponent)  
    {
      component.historyList = this.historyList;
    }
    else if(component instanceof ReceiptComponent) 
    {
      component.receiptId = this.receiptId
      component.receiptSignal = this.receiptSignal!;

      component.receiptChange.subscribe((updatedReceipt: IHistory) => {
        this.receiptSignal.set(updatedReceipt);
        this.historyList.push(updatedReceipt);
        //here can take updatedReceipt elements and use them for receipt to post API

        let linesToInsert: insertReceiptLine[] = []
        for (let line of updatedReceipt.lines) {
          let lineObjectToAdd = {
            productId: 1009,//line.product_id,
            quantity: line.quantity
          }
          linesToInsert.push(lineObjectToAdd)
        }
        const receiptToPost: InsertReceipt = {
          registerId: 1,
          empId: updatedReceipt.user_id,
          recTime: updatedReceipt.date,
          paymentType: "card",
          ReceiptLines: linesToInsert
        }
        console.log('Updated receipt received:', updatedReceipt);
        console.log("Length:")
        console.log("receipt object for post", receiptToPost)
        this.rec.createReceiptPost(receiptToPost);
      });
    }
    else {
      // component.products =  this.products;
    }       
  } 
}