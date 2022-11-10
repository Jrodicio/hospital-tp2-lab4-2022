import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../../providers/firestore.service';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.scss']
})
export class TurnosComponent implements OnInit {

  public turnosAsignados: any[] = [];
  public misEspecialistas: any[] = [];
  public misEspecialidades: string[] = [];

  public filtro: {administrador: boolean, especialista: any, paciente: any, especialidad: string} = {administrador: true, especialista: undefined, paciente: undefined, especialidad: ''};
  public filtroAdicional: string = '';

  constructor(private firestoreService: FirestoreService) {
  }

  ngOnInit(): void {
    this.firestoreService.getDocument("users",JSON.parse(localStorage.getItem('user')!).uid)
    .then((user) => {
      this.firestoreService.getDocuments("turnos").subscribe(turnos => {
        this.turnosAsignados = turnos.sort((a,b) => a['fecha'] - b['fecha']);

        this.turnosAsignados.forEach(turno => {
          if(!this.misEspecialistas.find((especialista => turno.especialista.uid === especialista.uid))){
            this.misEspecialistas.push(turno.especialista);
          }
          if(!this.misEspecialidades.find((especialidad => turno.especialidad === especialidad))){
            this.misEspecialidades.push(turno.especialidad);
          }
        });
      });
    });
  }

  setEspecialidad(especialidad: string){
    this.filtro = {administrador: true, paciente:this.filtro.paciente, especialidad: especialidad, especialista:undefined};
  }

  setEspecialista(especialista: any){
    this.filtro = {administrador: true, paciente:this.filtro.paciente, especialidad: '', especialista:especialista};
  }

  limpiarFiltro(){
    this.filtro = {administrador: true, paciente:this.filtro.paciente, especialidad: '', especialista:undefined};
  }

}
