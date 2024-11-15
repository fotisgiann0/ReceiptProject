import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-custom-modal',
  template: `
    <div class="modal-backdrop" (click)="close()"></div>
    <div class="modal-content">
      <h2>Custom Modal</h2>
      <p>This is a custom modal popup!</p>
      <button (click)="close()">Close</button>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: rgba(0, 0, 0, 0.5);
    }
    .modal-content {
      position: fixed;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 20px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }
  `]
})
export class CustomModalComponent {
  @Output() closeModal = new EventEmitter<void>();

  close(): void {
    this.closeModal.emit();
  }
}
