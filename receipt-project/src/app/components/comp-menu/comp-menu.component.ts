import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
// import { MatBodyComponent } from './menu-body/menu-body.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-comp-menu',
  standalone: true,
  imports: [RouterLink, MatMenuModule, MatButtonModule],
  templateUrl: './comp-menu.component.html'
})
export class CompMenuComponent {

}
