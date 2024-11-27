import { Routes } from '@angular/router';
import { ReceiptComponent } from './components/receipt/receipt.component';
import { HistoryComponent } from './components/history/history.component';
import { SettingsComponent } from './components/settings/settings.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginUserComponent } from './components/login-user/login-user.component';

export const routes: Routes = [
    { path: '', component: WelcomePageComponent},
    { 
        path: 'home', 
        component: HomePageComponent,
        children: [
            { path: 'cashRegister', component: ReceiptComponent },
            { path: 'history', component: HistoryComponent },
            { path: 'settings', component: SettingsComponent }
    ]},
    { path: 'login', component: LoginUserComponent },
    { path: 'register', component: UserRegisterComponent }
];
