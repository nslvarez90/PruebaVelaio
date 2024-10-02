import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Person } from 'src/app/models/person.model';
import { Task } from 'src/app/models/taks.model';
import { PersonsService } from 'src/app/services/persons.service';
import { TaskService } from 'src/app/services/task.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-taks-create-edit',
  templateUrl: './taks-create-edit.component.html',
  styleUrls: ['./taks-create-edit.component.css'],
})
export class TaksCreateEditComponent {
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    limitDate: new FormControl(''),
    persons: new FormControl(''),
  });
  submitted: boolean = false;
  isReady: boolean = false;
  listPersons: Array<Person> = [];
  personsUrl: string = './assets/persons.json';
  taskToInsert: Task = new Task();
  public taskList: Array<Task> = [];
  constructor(
    private formBuilder: FormBuilder,
    private _personService: PersonsService,
    private _taskService: TaskService,
    private _utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('PERSONS')) {
      const valuesList = localStorage.getItem('PERSONS');
      if (valuesList) this.listPersons = JSON.parse(valuesList);
      else this.listPersons = [];
      this.form = this.formBuilder.group({
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(80),
          ],
        ],
        limitDate: ['', [Validators.required]],
        persons: ['', [Validators.required]],
      });
      this.isReady = true;
    } else {
      this._personService.getAllPersons(this.personsUrl).subscribe({
        next: (v) => {
          this.listPersons = v;
        },
        error: (e) => console.error(e),
        complete: () => {
          //console.log(this.productList)
          this.form = this.formBuilder.group({
            name: [
              '',
              [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(80),
              ],
            ],
            limitDate: ['', [Validators.required]],
            persons: ['', [Validators.required]],
          });
          this.isReady = true;
        },
      });
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      this._utilityService.getNotificationError(
        'Error',
        'Revise los datos insertados, no son correctos'
      );
      return;
    }
    const valuesList = localStorage.getItem('TAKS');
    if (valuesList) this.taskList = JSON.parse(valuesList);
    else this.taskList = [];
    this.taskToInsert.name = this.form.get('name')?.value;
    this.taskToInsert.limitDate = this.form.get('limitDate')?.value;
    let selectedPersons = this.form.get('persons')?.value;
    this.taskToInsert.persons = [];
    console.log(selectedPersons);
    selectedPersons.forEach((item: number) => {
      this.taskToInsert.persons?.push(this.listPersons[item]);
    });
    this.taskToInsert.status = false;
    this.taskToInsert.id = this._taskService.getNextId();
    this.taskList.push(this.taskToInsert);
    localStorage.setItem('TAKS', JSON.stringify(this.taskList));
    this.form.reset();
    this.submitted = false;
    this._utilityService.getNotificationConfirm(
      'Tarea adicionada de forma Satisfactoria'
    );
    return;
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
