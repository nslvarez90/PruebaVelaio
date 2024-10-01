import { Person } from './person.model';
/**
* @author Nelson Sánchez Alvarez
* @date 2024/01/10
*/
export class Task {
    constructor(
      public id?: number,      
      public name ?: string,  
      public status?: boolean,
      public limitDate?: Date,      
      public persons?: Person[]
    ) { }
  }