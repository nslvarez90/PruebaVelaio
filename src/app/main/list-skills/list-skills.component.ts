import { Component } from '@angular/core';
import { Person } from 'src/app/models/person.model';
import { Skill } from 'src/app/models/skill.model';
import { PersonsService } from 'src/app/services/persons.service';
import { SkillService } from 'src/app/services/skills.service';
import { UtilityService } from 'src/app/services/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-skills',
  templateUrl: './list-skills.component.html',
  styleUrls: ['./list-skills.component.css']
})
export class ListSkillsComponent {
  public title: string = "Lista de Habilidades"
  public isReady: boolean = false
  public paymentReady: boolean = true
  public skillsList: Array<Skill> = []
  public skillsUrl: string = './assets/skills.json'
  constructor(
    private _skillsService: SkillService,
    private _utilityService: UtilityService,
  ) { }
  ngOnInit() {
    if (localStorage.getItem('SKILLS')) {
      const valuesList=localStorage.getItem('SKILLS');
      if(valuesList)
         this.skillsList =JSON.parse(valuesList);
      else
         this.skillsList=[];

      localStorage.setItem('SKILLS',JSON.stringify(this.skillsList)) ; 
     this.isReady = true
    }
    else {
      this._skillsService.getAllSkils(this.skillsUrl).subscribe({
        next: (v) => {
          this.skillsList = v;
          localStorage.setItem('SKILLS',JSON.stringify(this.skillsList)) ; 
        },
        error: (e) => console.error(e),
        complete: () => {
          this.isReady = true
        }
      })
    }
  } 
  onDelete(index:any){

    Swal.fire({
      title: "Esta seguro de eliminar esta Habilidad?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Eliminar",
      denyButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        this.skillsList.splice(index, 1);
        localStorage.setItem("SKILLS",JSON.stringify(this.skillsList))
        Swal.fire("Habilidad eliminada!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Se ha cancelado la operacion", "", "info");
      }
    });
     
     //this.ngOnInit();
  }
}
