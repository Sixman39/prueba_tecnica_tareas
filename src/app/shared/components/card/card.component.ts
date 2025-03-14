import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { Tooltip } from 'bootstrap';
import { TextConstants } from '../../../utils/constants/TitleConstants';
import { Tarea } from '../../../interfaces/tareas.interface';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements AfterViewInit{

  @Input() tarea?: Tarea;
  @Input() create: boolean = false;
  @Output() eliminado = new EventEmitter<number>();
  @Output() completado = new EventEmitter<number>();

  readonly TITULO_PENDIENTE = TextConstants.TITULO_PENDIENTE;
  readonly TITULO_COMPLETADO = TextConstants.TITULO_COMPLETADO;

  public editarTarea: boolean = false;

  ngAfterViewInit() {
    this.initializateTooltip();
  }

  /**
   * Metodo que inicializa los tooltips de las cards
   * @author david julian martinez
   */
  private initializateTooltip(){
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(tooltipTriggerEl => new Tooltip(tooltipTriggerEl));
  }




  /**
   * Metodo para eliminar una tarea y notificar al metodo en home
   * @author david julian martinez
   */
  public deleteTask(){
    this.diposeTooltip()
    this.eliminado.emit(this.tarea?.idTarea);

    this.initializateTooltip();
  }
  /**
   * Metodo que elimina los tooltips
   */
  private diposeTooltip(){
    // Destruye todos los tooltips asociados a la card seleccionada
    const tooltipElements = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipElements.forEach((element) => {
      const tooltipInstance = Tooltip.getInstance(element);
      if (tooltipInstance) {
        tooltipInstance.dispose(); // Destruye la instancia del tooltip
      }
    });
  }

  /**
   * Metodo que notifica que tarea se debe cambiar de  estado
   * @author david julian martinez
   */
  public changeState(){
    this.diposeTooltip()
    this.completado.emit(this.tarea?.idTarea);
    this.initializateTooltip();
  }
}
