import { Routes } from '@angular/router';
import { ReceiptComponent } from './components/receipt/receipt.component';
import { HistoryComponent } from './components/history/history.component';
import { SettingsComponent } from './components/settings/settings.component';

export const routes: Routes = [{
    path:'cashRegister',
    component: ReceiptComponent
},
{
    path: 'history',
    component: HistoryComponent
},
{
    path: 'settings',
    component: SettingsComponent
}];
