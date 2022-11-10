import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mis-pacientes',
  templateUrl: './mis-pacientes.component.html',
  styleUrls: ['./mis-pacientes.component.scss']
})
export class MisPacientesComponent implements OnInit {

  public pacienteSeleccionado:any;
  public especialista:any;

  constructor() {
    this.especialista = JSON.parse(localStorage.getItem('user')!);
  }

  ngOnInit(): void {
  }

  onPacienteSelected(paciente: any){
    this.pacienteSeleccionado = paciente;
  }
}
