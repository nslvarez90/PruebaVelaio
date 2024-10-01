import { Skill } from './skill.model';
/**
* @author Nelson Sánchez Alvarez
* @date 2024/01/10
*/
export class Person {
    constructor(
      public id?: number,      
      public name ?: string,  
      public skills?: Skill[],
    ) { }
  }