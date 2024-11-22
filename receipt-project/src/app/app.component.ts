import { Component } from '@angular/core';
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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CompFooterComponent, CompHeaderComponent, CompMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'receipt-project';

  products: receiptLine[] = data;

  historyList: IHistory[] = receipts;

  onOutletLoaded(component: ReceiptComponent | SearchCatalogComponent | SettingsComponent | HistoryComponent) {
    if(component instanceof HistoryComponent)  {
      component.historyList = this.historyList;
    }
    else if(component instanceof ReceiptComponent) {
      component.products =  this.products;
      component.historyList = this.historyList;
      // this.historyList = component.historyList;
      console.log(component.historyList);
    }
    else {
      component.products =  this.products;
    }     
    
  } 

}
