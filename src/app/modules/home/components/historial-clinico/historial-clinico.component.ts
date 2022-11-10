import { Component, OnInit, Input } from '@angular/core';
import { FirestoreService } from '../../../../providers/firestore.service';

@Component({
  selector: 'app-historial-clinico',
  templateUrl: './historial-clinico.component.html',
  styleUrls: ['./historial-clinico.component.scss']
})
export class HistorialClinicoComponent implements OnInit {

  @Input()
    usuario: any = undefined;
    listaTurnos: any[] = [];
  constructor(private firestoreService: FirestoreService) {
    this.firestoreService.getDocuments("turnos").subscribe(turnos => {
      this.listaTurnos = turnos.filter((turno)=>turno['paciente'].uid === this.usuario.uid && turno['informeClinico']).sort((a, b) => b['fecha'] - a['fecha']);
    })
  }

  ngOnInit(): void {
  }

  getObservacionesAdicionales(turno: any){
    let observacionesAdicionales: string[];
    observacionesAdicionales = Object.keys(turno.informeClinico).filter(key => !['temperatura','peso','presion','altura'].includes(key))
    return observacionesAdicionales;
  }
}
