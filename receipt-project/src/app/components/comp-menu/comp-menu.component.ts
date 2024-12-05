import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
// import { MatBodyComponent } from './menu-body/menu-body.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule} from '@angular/material/button';
import { AuthService } from '../../services/Authentication/auth-service.service';

@Component({
  selector: 'app-comp-menu',
  standalone: true,
  imports: [RouterLink, MatMenuModule, MatButtonModule],
  templateUrl: './comp-menu.component.html'
})
export class CompMenuComponent {

  authService = inject(AuthService)
}
