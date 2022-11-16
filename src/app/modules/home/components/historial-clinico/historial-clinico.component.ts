import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FirestoreService } from '../../../../providers/firestore.service';

@Component({
  selector: 'app-historial-clinico',
  templateUrl: './historial-clinico.component.html',
  styleUrls: ['./historial-clinico.component.scss']
})
export class HistorialClinicoComponent implements OnInit, OnChanges {

  @Input()
    usuario: any = undefined;
  @Input()
    especialista: any = undefined;
    public listaTurnos: any[] = [];
    public todosLosTurnos: any[] = [];

    public userProfile: string = '';
  constructor(private firestoreService: FirestoreService) {
    this.firestoreService.getDocuments("turnos").subscribe(turnos => {
      this.todosLosTurnos = turnos.filter((turno)=>turno['paciente'].uid === this.usuario.uid && turno['informeClinico']).sort((a, b) => b['fecha'] - a['fecha']);
      if(this.especialista){
        this.listaTurnos = this.todosLosTurnos.filter((turno)=>turno.especialista.uid === this.especialista.uid);
      }
      else{
        this.listaTurnos = this.todosLosTurnos;
      }
    })
  }

  ngOnInit(): void {
    if(localStorage.getItem('userProfile')){
      this.userProfile = localStorage.getItem('userProfile')!;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.especialista){
      this.listaTurnos = this.todosLosTurnos.filter((turno)=>turno.especialista.uid === this.especialista.uid);
    }
    else{
      this.listaTurnos = this.todosLosTurnos;
    }
  }

  getObservacionesAdicionales(turno: any){
    let observacionesAdicionales: string[];
    observacionesAdicionales = Object.keys(turno.informeClinico).filter(key => !['temperatura','peso','presion','altura'].includes(key))
    return observacionesAdicionales;
  }

  verResena(turno: any){
    swal(turno.diagnostico, turno.comentario, "info");
  }
}
