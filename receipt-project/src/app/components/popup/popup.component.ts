import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Input() paid_Total!: number;
  @Output() paid_TotalChange = new EventEmitter<number>();
  
  handleReset() {
    while(this.itemList.length > 0)
      this.itemList.pop();
    this.paid_Total= 0;
    this.paid_TotalChange.emit(this.paid_Total);
  }
}
