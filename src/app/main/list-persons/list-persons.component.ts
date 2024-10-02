import { Component } from '@angular/core';
import { Person } from './../../models/person.model';
import { TaskService } from 'src/app/services/task.service';
import { UtilityService } from 'src/app/services/utility.service';
import Swal from 'sweetalert2';
import { PersonsService } from 'src/app/services/persons.service';

@Component({
  selector: 'app-list-persons',
  templateUrl: './list-persons.component.html',
  styleUrls: ['./list-persons.component.css']
})
export class ListPersonsComponent {
  public title: string = "Lista de Personas"
  public isReady: boolean = false
  public paymentReady: boolean = true
  public personList: Array<Person> = []
  public personsUrl: string = './assets/persons.json'
  constructor(
    private _personService: PersonsService,
    private _utilityService: UtilityService,
  ) { }
  ngOnInit() {
    if (localStorage.getItem('PERSONS')) {
      const valuesList=localStorage.getItem('PERSONS');
      if(valuesList)
         this.personList=JSON.parse(valuesList);
      else
         this.personList=[];

      localStorage.setItem('PERSONS',JSON.stringify(this.personList)) ; 
     this.isReady = true
    }
    else {
      this._personService.getAllPersons(this.personsUrl).subscribe({
        next: (v) => {
          this.personList = v;
          localStorage.setItem('PERSONS',JSON.stringify(this.personList)) ; 
        },
        error: (e) => console.error(e),
        complete: () => {
          this.isReady = true
        }
      })
    }
  }
  getSkills( skills:any){
    let names="";
    skills?.forEach( (item:Person, index:number) => {     
      names+= index<skills.length-1 ? item.name+", ":item.name;
    })
    return names;
  }
  onDelete(index:any){

    Swal.fire({
      title: "Esta seguro de eliminar esta Persona?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Eliminar",
      denyButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        this.personList.splice(index, 1);
        localStorage.setItem("PERSONS",JSON.stringify(this.personList))
        Swal.fire("Persona eliminada!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Se ha cancelado la operacion", "", "info");
      }
    });
     
     //this.ngOnInit();
  }
}
