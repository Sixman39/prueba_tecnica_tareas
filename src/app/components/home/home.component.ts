import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { TextConstants } from '../../utils/constants/TitleConstants';
import { Tarea } from '../../interfaces/tareas.interface';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CardComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{


  readonly TITULO_GALERIA = TextConstants.TITULO_GALERIA;
  readonly TITULO_TABLERO = TextConstants.TITULO_TABLERO;
  readonly TITULO_TAREAS = TextConstants.TITULO_TAREAS;

  public listaTareas: Tarea[] = [];
  public listaTareasOriginal: Tarea[] = [];
  public formFilter!: FormGroup;

  ngOnInit(): void {
    this.getTasks();
    this.initializateFormFilter();
  }

  constructor(private readonly formBuilder: FormBuilder){}

  /**
   * Metodo para inicializar el form para el filtro
   * @author david julian martinez
   */
  private initializateFormFilter(){
    this.formFilter = this.formBuilder.group({
      filtro: ['',]
    });
  }

  /**
   * Metodo para obtener todas las tareas
   * @author david julian martinez
   */
  private getTasks(){
    this.listaTareas = [
      {
        idTarea: 0,
        titulo: 'Prueba 1',
        descripcion: 'Prueba 2',
        estado: 1
      },
      {
        idTarea: 1,
        titulo: 'Prueba 2',
        descripcion: 'Prueba 2',
        estado: 2
      },
      {
        idTarea: 2,
        titulo: 'Prueba 3',
        descripcion: 'Prueba 2',
        estado: 2
      },
      {
        idTarea: 3,
        titulo: 'Prueba 4',
        descripcion: 'Prueba 2',
        estado: 1
      },
      {
        idTarea: 4,
        titulo: 'Prueba 4',
        descripcion: 'Prueba 2',
        estado: 1
      },
      {
        idTarea: 5,
        titulo: 'Prueba 4',
        descripcion: 'Prueba 2',
        estado: 1
      },
      {
        idTarea: 6,
        titulo: 'Prueba 4',
        descripcion: 'Prueba 2',
        estado: 1
      },
    ];

    this.listaTareasOriginal = this.listaTareas;
  }

  /**
   * Metodo para filtrar las tareas segun la información deñ filtro
   */
  public filterTask(){
    const controlFilter = this.formFilter.get('filtro');
    this.listaTareas = this.listaTareasOriginal.filter(task => task.titulo.toLowerCase() == controlFilter?.value.toLowerCase());
  }

  /**
   * Metodo para filtrar todas las tareas pendientes
   * @author david julian martinez
   */
  public getPendingTask(){
    this.listaTareas = this.listaTareasOriginal.filter(task => task.estado == 1);
  }

  /**
   * Metodo para filtrar todas las tareas completadas
   * @author david julian martinez
   */
  public getCompleteTask(){
    this.listaTareas = this.listaTareasOriginal.filter(task => task.estado == 2);
  }

  /**
   * Metodo para eliminar un dato de la lista
   * @author david julian martinez
   * @param event number
   */
  public deleteTask(event: number){
    this.listaTareas = this.listaTareas.filter(task => task.idTarea !== event);
    this.listaTareasOriginal = this.listaTareasOriginal.filter(task => task.idTarea !== event);
  }
  /**
   * Metodo para cambiar el estado de una tarea
   * @param event
   */
  public changeState(event: number){
    const tareaEncontrada = this.listaTareasOriginal.find(tarea => tarea.idTarea === event);
    if (tareaEncontrada) {
      tareaEncontrada.estado = 2;
    }
  }

  /**
   * Metodo para filtrar todas las tareas
   * @author david julian martinez
   */
  public getAllTask(){
    this.listaTareas = this.listaTareasOriginal;
  }

  /**
   * getter para obtener la lista de todas las tareas pendientes
   * @author david julian martinez
   */
  get getTotalPendingTask(){
    const tasks = this.listaTareasOriginal;
    var countTasks = tasks.reduce((count, tarea) => tarea.estado === 1 ? count + 1 : count, 0);
    return countTasks;
  }
  /**
   * getter para obtener la lista de todas las tareas completadas
   * @author david julian martinez
   */
  get getTotalCompleteTask(){
    const tasks = this.listaTareasOriginal;
    var countTasks = tasks.reduce((count, tarea) => tarea.estado === 2 ? count + 1 : count, 0);
    return countTasks;
  }

}
