import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { CONSTANTS } from '../app.constans';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Person } from '../models/person.model';


@Injectable({
  providedIn: 'root',
})
export class PersonsService {
  public personList: Array<Person> = [];
  constructor(public router: Router, private http: HttpClient) {}

  public getAllPersons(url: string): Observable<any> {
    return this.http.get(url);
  }
  public getNextId() {
    if (localStorage.getItem('PERSONS')) {
      const valuesList = localStorage.getItem('PERSONS');
      if (valuesList) this.personList = JSON.parse(valuesList);
      else this.personList = [];
      if (this.personList.length > 0) return this.personList.length+1;
      else return 1;
    }
    return 3;
  }
}