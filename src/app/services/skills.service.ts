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

  constructor(public router: Router, private http: HttpClient) {}

  public getAllSkils(url: string): Observable<any> {
    return this.http.get(url);
  }
}