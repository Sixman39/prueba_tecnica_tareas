import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Tooltip } from 'bootstrap';
import { TextConstants } from '../../../utils/constants/TitleConstants';
import { Tarea } from '../../../interfaces/tareas.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-card',
  imports: [CommonModule, ToastComponent, ReactiveFormsModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit,AfterViewInit{

  @Input() tarea?: Tarea;
  @Input() create: boolean = false;
  @Input() tamaño?: number;
  @Output() eliminado = new EventEmitter<number>();
  @Output() completado = new EventEmitter<number>();
  @Output() nuevaTarea = new EventEmitter<Tarea>();

  readonly TITULO_PENDIENTE = TextConstants.TITULO_PENDIENTE;
  readonly TITULO_COMPLETADO = TextConstants.TITULO_COMPLETADO;

  public editarTarea: boolean = false;
  public formTask!: FormGroup;
  public toastText: string = '';
  public toastTitle: string = '';
  public toastBackground: string = '';
  public showToast: boolean = false;

  constructor(private readonly formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.initializateFormTask();
  }

  ngAfterViewInit() {
    this.initializateTooltip();
  }

  /**
   * Metodo para inicializar el form para el filtro
   * @author david julian martinez
   */
  private initializateFormTask(){
    this.formTask = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.maxLength(30)]],
      descripcion: ['', [Validators.required, Validators.maxLength(140)]],
    });
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

  /**
   * Metodo para cambiar de modo edicion a modo agregar
   * @author david julian martinez
   */
  public changeMode(){
    if(!this.editarTarea){
      this.initializateTooltip();
      this.editarTarea = true;
    } else {
      this.editarTarea = false;
      this.diposeTooltip();
    }
  }

  public saveTask(){
    const controllerTitulo = this.formTask.get('titulo');
    const controllerDescripcion = this.formTask.get('descripcion');

    if (controllerDescripcion?.hasError('required') && controllerTitulo?.hasError('required')) {
      this.toastText = 'los campos son obligatorios.';
      this.toastTitle = 'Error';
      this.toastBackground = 'bg-danger';
      this.toggleToast();

    } else if (controllerTitulo?.hasError('maxlength')) {

      this.toastText = 'El titulo es muy largo.';
      this.toastTitle = 'Error';
      this.toastBackground = 'bg-danger';
      this.toggleToast();

    } else if (controllerDescripcion?.hasError('maxlength')){

      this.toastText = 'la descripcion es muy larga.';
      this.toastTitle = 'Error';
      this.toastBackground = 'bg-danger';
      this.toggleToast();

    } else {

      const task: Tarea = {
        idTarea: this.tamaño! + 1,
        titulo: controllerTitulo?.value,
        descripcion: controllerDescripcion?.value,
        estado: 1
      }

      this.nuevaTarea.emit(task)

      this.changeMode();

      this.toastText = 'Se guardo con exito la tarea.';
      this.toastTitle = 'Exito';
      this.toastBackground = 'bg-success';
      this.toggleToast();
    }
  }

  private toggleToast(){
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }
}
