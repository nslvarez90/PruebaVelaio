import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { UtilityService } from './services/utility.service';
import { Person } from './models/person.model';
import { PersonsService } from './services/persons.service';
import { TaskService } from './services/task.service';
import { SkillService } from './services/skills.service';
import { HttpClientModule } from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: PathLocationStrategy,
  },
    UtilityService,
    PersonsService,
    TaskService,
    SkillService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
