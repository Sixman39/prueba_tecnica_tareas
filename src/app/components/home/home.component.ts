import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { TextConstants } from '../../utils/constants/TitleConstants';
import { Dropdown } from 'bootstrap';
import { Tarea } from '../../interfaces/tareas.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{


  readonly TITULO_GALERIA = TextConstants.TITULO_GALERIA;
  readonly TITULO_TABLERO = TextConstants.TITULO_TABLERO;
  readonly TITULO_TAREAS = TextConstants.TITULO_TAREAS;

  public listaTareas: Tarea[] = [];
  public listaTareasOriginal: Tarea[] = [];

  ngOnInit(): void {
    this.getTasks();
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
        idTarea: 3,
        titulo: 'Prueba 4',
        descripcion: 'Prueba 2',
        estado: 1
      },
      {
        idTarea: 3,
        titulo: 'Prueba 4',
        descripcion: 'Prueba 2',
        estado: 1
      },
      {
        idTarea: 3,
        titulo: 'Prueba 4',
        descripcion: 'Prueba 2',
        estado: 1
      },
    ];

    this.listaTareasOriginal = this.listaTareas;
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
