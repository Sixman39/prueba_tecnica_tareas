import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input } from '@angular/core';
import { Tooltip } from 'bootstrap';
import { TextConstants } from '../../../utils/constants/TitleConstants';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements AfterViewInit{

  @Input() titulo?: string;
  @Input() descripcion?: string;
  @Input() estado?: number;

  readonly TITULO_PENDIENTE = TextConstants.TITULO_PENDIENTE;
  readonly TITULO_COMPLETADO = TextConstants.TITULO_COMPLETADO;

  ngAfterViewInit() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl));
  }

}
