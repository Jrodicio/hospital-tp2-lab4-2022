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

  public pacienteElegido: any = {uid: '0'}


  constructor(private firestoreService: FirestoreService) {
  }

  ngOnInit(): void {
    this.firestoreService.getDocuments('users').subscribe(users => {this.listaPacientes = users.filter(usuario => usuario['perfil'] == 'Paciente')});
  }

  seleccionar(paciente: any){
    this.pacienteElegido = paciente;
    this.pacienteSeleccionado.emit(this.pacienteElegido);
  }
}
