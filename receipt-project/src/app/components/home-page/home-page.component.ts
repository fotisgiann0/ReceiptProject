import { Component, computed, Input, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CompHeaderComponent } from "../comp-header/comp-header.component";
import { CompMenuComponent } from "../comp-menu/comp-menu.component";
import { CompFooterComponent } from "../comp-footer/comp-footer.component";
import { ReceiptComponent } from '../receipt/receipt.component';
import { ListingInputComponent } from '../listing-input/listing-input.component';
import { PopupComponent } from '../popup/popup.component';
import { receiptLine } from '../../Interfaces/receiptLineInterface';
import { SearchCatalogComponent } from '../search-catalog/search-catalog.component';
import data from '../../data/products.json';
import receipts from '../../data/receipts.json'
import { SettingsComponent } from '../settings/settings.component';
import { HistoryComponent } from '../history/history.component';
import { IHistory } from '../../Interfaces/historyInterface';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CompHeaderComponent, CompMenuComponent, CompFooterComponent, RouterOutlet, HttpClientModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  @Input({
    required: true
  }) user_id!: number;

  public data: any;
  products: receiptLine[] = data;
  
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

  constructor(private http: HttpClient, private route: ActivatedRoute) {
  }

  ngOnInit() {
    // Fetch the query parameter
    this.route.queryParams.subscribe(params => {
      this.user_id = params['user_id'];
    });
  }

  fetachDetails(){
    this.http.get('https://localhost:7006/message/').subscribe(
      (response:any) => {
        console.log(response);
        this.data = response;
      }
    );
  }
    
  onOutletLoaded(component: ReceiptComponent | SearchCatalogComponent | SettingsComponent | HistoryComponent) {
    if(component instanceof HistoryComponent)  
    {
      component.historyList = this.historyList;
    }
    else if(component instanceof ReceiptComponent) 
    {

      // component.user_id = this.user_id;

      component.receiptId = this.receiptId
      component.receiptSignal = this.receiptSignal!;

      component.products =  this.products;

      component.receiptChange.subscribe((updatedReceipt: IHistory) => {
        this.receiptSignal.set(updatedReceipt);
        this.historyList.push(updatedReceipt);

        console.log('Updated receipt received:', updatedReceipt);
        console.log("Length:")
        console.log(this.historyList.length)
        
      });
    }
    else {
      component.products =  this.products;
    }       
  } 
}