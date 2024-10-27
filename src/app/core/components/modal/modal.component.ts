import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  isOpen = false;

  @Output() close = new EventEmitter<void>();

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
    this.close.emit();
  }
}
