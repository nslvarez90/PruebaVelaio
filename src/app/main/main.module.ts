import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { ListTasksComponent } from './list-tasks/list-tasks.component';
import { TaksCreateEditComponent } from './taks-create-edit/taks-create-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListPersonsComponent } from './list-persons/list-persons.component';
import { CreatePersonsComponent } from './create-persons/create-persons.component';
import { ListSkillsComponent } from './list-skills/list-skills.component';
import { CreateSkillComponent } from './create-skill/create-skill.component';


@NgModule({
  declarations: [
    ListTasksComponent,
    TaksCreateEditComponent,
    ListPersonsComponent,
    CreatePersonsComponent,
    ListSkillsComponent,
    CreateSkillComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MainModule { }
