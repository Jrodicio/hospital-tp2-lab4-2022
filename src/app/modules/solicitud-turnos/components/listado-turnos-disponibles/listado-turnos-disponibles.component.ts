import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FirestoreService } from '../../../../providers/firestore.service';

@Component({
  selector: 'app-listado-turnos-disponibles',
  templateUrl: './listado-turnos-disponibles.component.html',
  styleUrls: ['./listado-turnos-disponibles.component.scss']
})
export class ListadoTurnosDisponiblesComponent implements OnInit {

  @Output()
    turnoSeleccionado: EventEmitter<Date> = new EventEmitter<Date>();
  @Output()
    diaSeleccionado: EventEmitter<Date> = new EventEmitter<Date>();

  @Input()
    horarioSeleccionado: Date | undefined;
  @Input()
    fechaSeleccionada: Date | undefined;

  @Input()
    especialista: any;

  public turnosDisponibles: Date[] = [];

  constructor(private firestoreService: FirestoreService) {
    this.firestoreService.getDocuments("turnos").subscribe((turnos) =>{
      this.turnosDisponibles = [];
      let disponibilidadHoraria = this.getDisponibilidadHoraria();

      let turnosTomados = turnos.filter(turno => turno['especialista'].uid === this.especialista.uid
        && turno['fecha'] >= (new Date()).getTime()
        && ['Pendiente','Aceptado'].includes(turno['estado']));

      disponibilidadHoraria = disponibilidadHoraria.filter(horario => horario.getTime())
      turnosTomados.forEach(turno => {
        const id = disponibilidadHoraria.findIndex(horario => {
          return horario.getTime() === turno['fecha']
        });
        if(id > -1){
          disponibilidadHoraria.splice(id,1);
        }
      });
      this.turnosDisponibles = disponibilidadHoraria;
    });
  }

  ngOnInit(): void {
  }

  seleccionarFecha(fecha: Date | undefined){
    this.fechaSeleccionada = fecha;
    this.diaSeleccionado.emit(this.fechaSeleccionada);
  }

  seleccionarHorario(fechaHora: Date | undefined){
    this.horarioSeleccionado = fechaHora;
    this.turnoSeleccionado.emit(this.horarioSeleccionado);
  }

  getDisponibilidadHoraria(){
    const hoy = new Date();
    let disponibilidadHoraria: Date[] = [];
    for(let dia = 0; dia <= 15; dia++){
      let fecha = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate()+dia);
      let weekDay = fecha.getDay()-1;

      if(weekDay == -1 || this.especialista.horario[weekDay].na) continue;

      for(let hora = this.especialista.horario[weekDay].tm? 8 : 13; hora < (this.especialista.horario[weekDay].tm? 14 : 19); hora++){
        for(let minutos = 0; minutos <= 30; minutos +=30){
          let fechaPush = new Date(fecha);
          fechaPush.setHours(hora, minutos);
          if(fechaPush.getTime() > hoy.getTime()){
            disponibilidadHoraria.push(fechaPush);
          }
        }
      }
    }
    return  disponibilidadHoraria;
  }
}
