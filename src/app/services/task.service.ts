import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { CONSTANTS } from '../app.constans';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Task } from '../models/taks.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  public taskList: Array<Task> = [];
  constructor(public router: Router, private http: HttpClient) {}

  public getAllTask(url: string): Observable<any> {
    return this.http.get(url);
  }
  public getNextId() {
    if (localStorage.getItem('TAKS')) {
      const valuesList = localStorage.getItem('TAKS');
      if (valuesList) this.taskList = JSON.parse(valuesList);
      else this.taskList = [];
      if (this.taskList.length > 0) return this.taskList.length+1;
      else return 1;
    }
    return 3;
  }
}
