import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FirestoreService } from '../../../../providers/firestore.service';

@Component({
  selector: 'app-listado-pacientes',
  templateUrl: './listado-pacientes.component.html',
  styleUrls: ['./listado-pacientes.component.scss']
})
export class ListadoPacientesComponent implements OnInit {

  @Input()
    especialistaSeleccionado: any;

  @Output()
    pacienteSelected: EventEmitter<any> = new EventEmitter();

  private turnos: any[] = [];
  public listaPacientes: any[]= [];
  public cargando: boolean = true;

  constructor(
    private firestoreService: FirestoreService
  ) {
    this.firestoreService.getDocuments('turnos').subscribe((turnos)=>{
      console.log('turnos:',turnos)
      console.log('UID:',this.especialistaSeleccionado)
      const turnosAsignados:any[] = turnos.filter(turno => turno['especialista'].uid === this.especialistaSeleccionado.uid).sort((a,b) => a['fecha'] - b['fecha']);
      console.log('turnosAsignados:',turnosAsignados)
      turnosAsignados.forEach(turno => {
        if(!this.listaPacientes.find((paciente => turno.paciente.uid === paciente.uid))){
          this.listaPacientes.push(turno.paciente);
        }
      });
    });
  }

  ngOnInit(): void {
    setTimeout(()=>{
      this.cargando=false;
    },2000);

  }

  seleccionarPaciente(paciente: any){
    this.pacienteSelected.emit('');
    setTimeout(()=>{
      this.pacienteSelected.emit(paciente);
    },5)
  }
}
