import { Person } from './../../models/person.model';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Skill } from 'src/app/models/skill.model';
import { Task } from 'src/app/models/taks.model';
import { PersonsService } from 'src/app/services/persons.service';
import { SkillService } from 'src/app/services/skills.service';
import { TaskService } from 'src/app/services/task.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-create-persons',
  templateUrl: './create-persons.component.html',
  styleUrls: ['./create-persons.component.css'],
})
export class CreatePersonsComponent {
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    limitDate: new FormControl(''),
    persons: new FormControl(''),
  });
  submitted: boolean = false;
  isReady: boolean = false;
  listSkills: Array<Skill> = [];
  skillsUrl: string = './assets/skills.json';
  PersonToInsert: Person = new Person();
  public personList: Array<Person> = [];
  constructor(
    private formBuilder: FormBuilder,
    private _personService: PersonsService,
    private _taskService: TaskService,
    private _skillService: SkillService,
    private _utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('SKILLS')) {
      const valuesList = localStorage.getItem('SKILLS');
      if (valuesList) this.listSkills = JSON.parse(valuesList);
      else this.listSkills = [];
      this.form = this.formBuilder.group({
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(80),
          ],
        ],
        skills: ['', [Validators.required]],
      });
      this.isReady = true;
    } else {
      this._skillService.getAllSkils(this.skillsUrl).subscribe({
        next: (v) => {
          this.listSkills = v;
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
            skills: ['', [Validators.required]],
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
    const valuesList = localStorage.getItem('PERSONS');
    if (valuesList) this.personList = JSON.parse(valuesList);
    else this.personList = [];
    this.PersonToInsert.name = this.form.get('name')?.value;
    let selectedSkilss = this.form.get('skills')?.value;
    this.PersonToInsert.skills = [];
    console.log(selectedSkilss);
    selectedSkilss.forEach((item: number) => {
      this.PersonToInsert.skills?.push(this.listSkills[item]);
    });
   
    this.PersonToInsert.id = this._personService.getNextId();
    this.personList.push(this.PersonToInsert);
    localStorage.setItem('PERSONS', JSON.stringify(this.personList));
    this.form.reset();
    this.submitted = false;
    this._utilityService.getNotificationConfirm(
      'Persona adicionada de forma Satisfactoria'
    );
    return;
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
