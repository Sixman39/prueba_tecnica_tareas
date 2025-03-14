import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {

  @Input() title: string = 'Notificación';
  @Input() message: string = 'Este es un mensaje de ejemplo';
  @Input() show: boolean = false;
  @Input() background: string = '.bg-white';

  // Método para cerrar el toast
  closeToast(): void {
    this.show = false;
  }

}
