import { Skill } from './../models/skill.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { CONSTANTS } from '../app.constans';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class SkillService {
  public skillLst: Array<Skill> = [];
  constructor(public router: Router, private http: HttpClient) {}

  public getAllSkils(url: string): Observable<any> {
    return this.http.get(url);
  }
  public getNextId() {
    if (localStorage.getItem('SKILLS')) {
      const valuesList = localStorage.getItem('SKILLS');
      if (valuesList) this.skillLst = JSON.parse(valuesList);
      else this.skillLst = [];
      if (this.skillLst.length > 0) return this.skillLst.length+1;
      else return 1;
    }
    return 4;
  }
}