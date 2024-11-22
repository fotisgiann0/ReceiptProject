import { Component, Input } from '@angular/core';
import { receiptLine } from '../../receiptLineInterface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  @Input({
    required: true,
  }) products:receiptLine[] = [];

  settingsForm = new FormGroup({
    stock : new FormControl('')
  })

  updateInvetory():void{
    this.products[0].stock = Number(this.settingsForm.value.stock);
  }
}