import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../../providers/firestore.service';

@Component({
  selector: 'app-turnos-especialista',
  templateUrl: './turnos-especialista.component.html',
  styleUrls: ['./turnos-especialista.component.scss']
})
export class TurnosEspecialistaComponent implements OnInit {

  public turnosAsignados: any[] = [];
  public misPacientes: any[] = [];
  public misEspecialidades: string[] = [];

  public filtro: {administrador: boolean, especialista: any, paciente: any, especialidad: string} = {administrador: false, especialista: undefined, paciente: undefined, especialidad: ''};

  constructor(private firestoreService: FirestoreService) {
  }

  ngOnInit(): void {
    this.firestoreService.getDocument("users",JSON.parse(localStorage.getItem('user')!).uid)
    .then((user) => {
      this.filtro.especialista = user.data();
      this.firestoreService.getDocuments("turnos").subscribe(turnos => {
        this.turnosAsignados = turnos.filter(turno => turno['especialista'].uid === this.filtro.especialista.uid).sort((a,b) => a['fecha'] - b['fecha']);
        console.log("turnos asignados:",this.turnosAsignados)
        this.turnosAsignados.forEach(turno => {
          if(!this.misPacientes.find((paciente => turno.paciente.uid === paciente.uid))){
            this.misPacientes.push(turno.paciente);
          }
          if(!this.misEspecialidades.find((especialidad => turno.especialidad === especialidad))){
            this.misEspecialidades.push(turno.especialidad);
          }
        });
      });
    });
  }

  setEspecialidad(especialidad: string){
    this.filtro = {administrador: false, paciente:undefined, especialidad: especialidad, especialista:this.filtro.especialista};
  }

  setPaciente(paciente: any){
    this.filtro = {administrador: false, paciente:paciente, especialidad: '', especialista:this.filtro.especialista};
  }

  limpiarFiltro(){
    this.filtro = {administrador: false, paciente:undefined, especialidad: '', especialista:this.filtro.especialista};
  }
}
