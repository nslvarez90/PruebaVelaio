import { Skill } from 'src/app/models/skill.model';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SkillService } from 'src/app/services/skills.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-create-skill',
  templateUrl: './create-skill.component.html',
  styleUrls: ['./create-skill.component.css']
})
export class CreateSkillComponent {
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl('')
  });
  skillsUrl: string = './assets/skills.json';
  submitted: boolean = false;
  isReady: boolean = false;
 SkillToInsert: Skill = new Skill();
  public skillsList: Array<Skill> = [];
  constructor(
    private formBuilder: FormBuilder,
    private _skillService: SkillService,
    private _utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('SKILLS')) {
      const valuesList = localStorage.getItem('SKILLS');
      if (valuesList) this.skillsList = JSON.parse(valuesList);
      else this.skillsList = [];
      this.form = this.formBuilder.group({
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(80),
          ],
        ],
        description: ['', [ Validators.required,
          Validators.minLength(5),
          Validators.maxLength(80),]],
      });
      this.isReady = true;
    } else {
      this._skillService.getAllSkils(this.skillsUrl).subscribe({
        next: (v) => {
          this.skillsList = v;
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
            description: ['', [ Validators.required,
              Validators.minLength(5),
              Validators.maxLength(80),]],
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
    const valuesList = localStorage.getItem('SKILLS');
    if (valuesList) this.skillsList = JSON.parse(valuesList);
    else this.skillsList = [];
    this.SkillToInsert.name = this.form.get('name')?.value;
    this.SkillToInsert.description  = this.form.get('description')?.value;
    
   
    this.SkillToInsert.id = this._skillService.getNextId();
    this.skillsList.push(this.SkillToInsert);
    localStorage.setItem('SKILLS', JSON.stringify(this.skillsList));
    this.form.reset();
    this.submitted = false;
    this._utilityService.getNotificationConfirm(
      'Habilidad adicionada de forma Satisfactoria'
    );
    return;
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
