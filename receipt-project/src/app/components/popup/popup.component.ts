import { Component, Input } from '@angular/core';
import { registerObject } from '../../cashRegisterObject';
import { ListingInputComponent } from "../listing-input/listing-input.component";

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [ListingInputComponent],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  @Input({
    required: true,
  }) itemList!: registerObject[]; //isws me = []

  handleReset() {
    while(this.itemList.length > 0)
      this.itemList.pop();
  }
}
