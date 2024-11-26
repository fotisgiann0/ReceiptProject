import { Component, computed, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CompFooterComponent } from './components/comp-footer/comp-footer.component';
import { CompHeaderComponent } from './components/comp-header/comp-header.component';
import { CompMenuComponent } from './components/comp-menu/comp-menu.component';
import { ReceiptComponent } from './components/receipt/receipt.component';
import { ListingInputComponent } from './components/listing-input/listing-input.component';
import { PopupComponent } from './components/popup/popup.component';
import { receiptLine } from './receiptLineInterface';
import { SearchCatalogComponent } from './components/search-catalog/search-catalog.component';
import data from './data/products.json';
import receipts from './data/receipts.json'
import { SettingsComponent } from './components/settings/settings.component';
import { HistoryComponent } from './components/history/history.component';
import { IHistory } from './historyInterface';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CompFooterComponent, CompHeaderComponent, CompMenuComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  
  title = 'receipt-project';
  
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

  constructor(private http: HttpClient) {
  }
  ngOnInit(): void {
    this.fetachDetails();
  }
//https://localhost:7006/message
//https://jsonplaceholder.typicode.com/todos/1
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
      //component.historyLengthSignal = this.historyListLengthSignal;
      component.receiptId = this.receiptId
      component.receiptSignal = this.receiptSignal!;

      component.products =  this.products;

      // if(component.receiptChange)
      // {
      component.receiptChange.subscribe((updatedReceipt: IHistory) => {
        this.receiptSignal.set(updatedReceipt);
        this.historyList.push(updatedReceipt);

        console.log('Updated receipt received:', updatedReceipt);
        console.log("Length:")
        console.log(this.historyList.length)
        
      });
      // }
    }
    else {
      component.products =  this.products;
    }       
  } 

}