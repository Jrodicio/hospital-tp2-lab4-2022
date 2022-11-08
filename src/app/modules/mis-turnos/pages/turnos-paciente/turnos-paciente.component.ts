import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../../providers/firestore.service';

@Component({
  selector: 'app-turnos-paciente',
  templateUrl: './turnos-paciente.component.html',
  styleUrls: ['./turnos-paciente.component.scss']
})
export class TurnosPacienteComponent implements OnInit {

  public turnosAsignados: any[] = [];
  public misEspecialistas: any[] = [];
  public misEspecialidades: string[] = [];

  public filtro: {administrador: boolean, especialista: any, paciente: any, especialidad: string} = {administrador: false, especialista: undefined, paciente: undefined, especialidad: ''};

  constructor(private firestoreService: FirestoreService) {
  }

  ngOnInit(): void {
    this.firestoreService.getDocument("users",JSON.parse(localStorage.getItem('user')!).uid)
    .then((user) => {
      this.filtro.paciente = user.data();
      this.firestoreService.getDocuments("turnos").subscribe(turnos => {
        this.turnosAsignados = turnos.filter(turno => turno['paciente'].uid === this.filtro.paciente.uid).sort((a,b) => a['fecha'] - b['fecha']);
        console.log("Turnos:",turnos);
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
    this.filtro = {administrador: false, paciente:this.filtro.paciente, especialidad: especialidad, especialista:undefined};
  }

  setEspecialista(especialista: any){
    this.filtro = {administrador: false, paciente:this.filtro.paciente, especialidad: '', especialista:especialista};
  }

  limpiarFiltro(){
    this.filtro = {administrador: false, paciente:this.filtro.paciente, especialidad: '', especialista:undefined};
  }
}
