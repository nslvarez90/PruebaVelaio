import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTasksComponent } from '../main/list-tasks/list-tasks.component';
import { TaksCreateEditComponent } from './taks-create-edit/taks-create-edit.component';
import { ListPersonsComponent } from './list-persons/list-persons.component';
import { CreatePersonsComponent } from './create-persons/create-persons.component';
import { ListSkillsComponent } from './list-skills/list-skills.component';
import { CreateSkillComponent } from './create-skill/create-skill.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'all',
    pathMatch: 'full',
  },
  {
    path: 'all',
    component: ListTasksComponent,
  },
  {
    path: 'create-task',
    component: TaksCreateEditComponent,
  },
  {
    path: 'list-persons',
    component: ListPersonsComponent,
  },
  {
    path: 'create-person',
    component: CreatePersonsComponent ,
  },
  {
    path: 'list-skills',
    component: ListSkillsComponent,
  },
  {
    path: 'create-skill',
    component: CreateSkillComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
