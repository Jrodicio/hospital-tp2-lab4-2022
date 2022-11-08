import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../../providers/firestore.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss']
})
export class SolicitarTurnoComponent implements OnInit {

  public paciente: any;
  public especialidadSeleccionada: string = '';
  public especialistaSeleccionado: any;
  public turnoSeleccionado: Date | undefined;
  public diaSeleccionado: Date | undefined;
  public seleccionarPaciente: boolean = false;
  public turnoSolicitado:boolean = false;
  public loading: boolean = false;

  constructor(private firestoreService: FirestoreService) {
    if(localStorage.getItem('userProfile') === "Paciente"){
      this.firestoreService.getDocument("users",JSON.parse(localStorage.getItem('user')!).uid)
      .then(user => {
        this.paciente = user.data();
      })
    }
    else if(localStorage.getItem('userProfile') === "Administrador"){
      this.seleccionarPaciente = true;
    }
  }

  ngOnInit(): void {
  }

  onPacienteSeleccionado(paciente: string){
    this.paciente = paciente;
  }

  onEspecialidadSeleccionada(especialidad: string){
    this.especialidadSeleccionada = especialidad;
    this.especialistaSeleccionado = undefined;
    this.diaSeleccionado = undefined;
    this.turnoSeleccionado = undefined;
  }

  onEspecialistaSeleccionado(especialista: any){
    this.especialistaSeleccionado = undefined;
    setTimeout(()=>{
      this.especialistaSeleccionado = especialista;
      this.diaSeleccionado = undefined;
      this.turnoSeleccionado = undefined;
    },1);
  }

  onFechaSeleccionada(dia: Date){
    this.diaSeleccionado = dia;
    this.turnoSeleccionado = undefined;
  }

  onTurnoSeleccionado(turno: Date){
    this.turnoSeleccionado = turno;
  }

  solicitarTurno(){
    this.loading = true;
    swal("Su turno está siendo registrado, por favor aguarde:", {
      icon: 'info',
      title: 'Solicitando turno',
      buttons: [false],
      closeOnClickOutside: false,
      closeOnEsc: false
    });
    this.firestoreService.addData("turnos",{
      especialista: this.especialistaSeleccionado,
      fecha: this.turnoSeleccionado?.getTime(),
      especialidad: this.especialidadSeleccionada,
      paciente: this.paciente,
      estado: 'Pendiente',
    })
    .then(()=>{
      if(this.seleccionarPaciente){
        this.paciente = undefined;
      }
      this.especialidadSeleccionada = '';
      this.especialistaSeleccionado = undefined;
      this.turnoSeleccionado = undefined;
      this.diaSeleccionado = undefined;
      this.loading = false;
      swal("¡Turno solicitado!","¡Muchas gracias por confiar en nosotros!",'success');
    })
  }
}
