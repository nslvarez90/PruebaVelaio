import { Person } from './../../models/person.model';
import { Task } from './../../models/taks.model';
import { Component } from '@angular/core';
import { PersonsService } from 'src/app/services/persons.service';
import { SkillService } from 'src/app/services/skills.service';
import { TaskService } from 'src/app/services/task.service';
import { UtilityService } from 'src/app/services/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.css'],
})
export class ListTasksComponent {
  public title: string = 'Lista de Tareas';
  public isReady: boolean = false;
  public paymentReady: boolean = true;
  public taskList: Array<Task> = [];
  public taskUrl: string = './assets/tasks.json';
  public personsUrl: string = './assets/persons.json';
  public skillsUrl: string = './assets/skills.json';
  constructor(
    private _tasksService: TaskService,
    private _personsService: PersonsService,
    private _skillService: SkillService,
    private _utilityService: UtilityService
  ) {}
  ngOnInit() {
    if (localStorage.getItem('TAKS')) {
      const valuesList = localStorage.getItem('TAKS');
      if (valuesList) this.taskList = JSON.parse(valuesList);
      else this.taskList = [];

      localStorage.setItem('TAKS', JSON.stringify(this.taskList));
      this.isReady = true;
    } else {
      this._tasksService.getAllTask(this.taskUrl).subscribe({
        next: (v) => {
          this.taskList = v;
          localStorage.setItem('TAKS', JSON.stringify(this.taskList));
          this._personsService.getAllPersons(this.personsUrl).subscribe({
            next: (data) => {
              localStorage.setItem('PERSONS', JSON.stringify(data));
            },
            error: (e) => console.error(e),
            complete: () => {
              this._skillService.getAllSkils(this.skillsUrl).subscribe({
                next: (values) => {
                  localStorage.setItem('SKILLS', JSON.stringify(values));
                },
                error: (e) => console.error(e),
              });
            },
          });
        },
        error: (e) => console.error(e),
        complete: () => {
          this.isReady = true;
        },
      });
    }
  }
  getNames(persons: any) {
    let names = '';
    persons?.forEach((item: Person, index: number) => {
      names += index < persons.length - 1 ? item.name + ', ' : item.name;
    });
    return names;
  }
  onDelete(index: any) {
    Swal.fire({
      title: 'Esta seguro de eliminar esta taera?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskList.splice(index, 1);
        localStorage.setItem('TAKS', JSON.stringify(this.taskList));
        Swal.fire('Tarea eliminada!', '', 'success');
      } else if (result.isDenied) {
        Swal.fire('Se ha cancelado la operacion', '', 'info');
      }
    });   
  }
  onChangeStatus(index: any) {
    Swal.fire({
      title: 'Esta seguro de cambiar es estado de esta taera?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Cambiar Estado',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskList[index].status=true;
        localStorage.setItem('TAKS', JSON.stringify(this.taskList));
        Swal.fire('Tarea editada!', '', 'success');
      } else if (result.isDenied) {
        Swal.fire('Se ha cancelado la operacion', '', 'info');
      }
    });
  }
}
