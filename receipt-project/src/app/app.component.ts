import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CompFooterComponent } from './components/comp-footer/comp-footer.component';
import { CompHeaderComponent } from './components/comp-header/comp-header.component';
import { CompMenuComponent } from './components/comp-menu/comp-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CompFooterComponent, CompHeaderComponent, CompMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'receipt-project';
}
