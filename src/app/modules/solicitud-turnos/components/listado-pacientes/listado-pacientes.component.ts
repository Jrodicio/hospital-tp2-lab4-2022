import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FirestoreService } from '../../../../providers/firestore.service';

@Component({
  selector: 'app-listado-pacientes',
  templateUrl: './listado-pacientes.component.html',
  styleUrls: ['./listado-pacientes.component.scss']
})
export class ListadoPacientesComponent implements OnInit {

  @Output()
    pacienteSeleccionado: EventEmitter<any> = new EventEmitter<any>();

  public listaPacientes: any[] = [];
  public filtroPacientes: string = '';

  public pacienteElegido: any;


  constructor(private firestoreService: FirestoreService) {
    this.firestoreService.getDocuments('users').subscribe(users => {this.listaPacientes = users.filter(usuario => usuario['perfil'] == 'Paciente')});
  }

  ngOnInit(): void {
  }

  seleccionar(paciente: any){
    this.pacienteElegido = paciente;
    this.pacienteSeleccionado.emit(this.pacienteElegido);
  }
}
