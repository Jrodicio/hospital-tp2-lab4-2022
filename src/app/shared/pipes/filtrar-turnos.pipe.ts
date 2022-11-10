import { Pipe, PipeTransform } from '@angular/core';
import { FechaHoraPipe } from './fecha-hora.pipe';

@Pipe({
  name: 'filtrarTurnos'
})
export class FiltrarTurnosPipe implements PipeTransform {

  // constructor(private fechaHora: FechaHoraPipe){}

  transform(turnos: any[], filtro: {administrador: boolean, especialista: any, paciente: any, especialidad: string}, filtroAdicional?: string): any[] {
    let turnosFiltrados: any[];
    if(filtro.administrador){
      if(filtro.especialista){
        turnosFiltrados = turnos.filter(turno => turno['especialista'].uid == filtro.especialista.uid);
      }
      else if(filtro.especialidad){
        turnosFiltrados = turnos.filter(turno => turno['especialidad'] == filtro.especialidad);
      }
      else{
        turnosFiltrados = turnos;
      }
    }
    else if(filtro.especialista && filtro.paciente){
      turnosFiltrados = turnos.filter(turno => turno['paciente'].uid == filtro.paciente.uid && turno['especialista'].uid == filtro.especialista.uid);
    }
    else if(filtro.especialista && filtro.especialidad){
      turnosFiltrados = turnos.filter(turno => turno['especialista'].uid == filtro.especialista.uid && turno['especialidad'] == filtro.especialidad);
    }
    else if(filtro.paciente && filtro.especialidad){
      turnosFiltrados = turnos.filter(turno => turno['paciente'].uid == filtro.paciente.uid && turno['especialidad'] == filtro.especialidad);
    }
    else if(filtro.especialista){
      turnosFiltrados = turnos.filter(turno => turno['especialista'].uid == filtro.especialista.uid);
    }
    else if(filtro.paciente){
      turnosFiltrados = turnos.filter(turno => turno['paciente'].uid == filtro.paciente.uid);
    }
    else{
      return [];
    }
    if(filtroAdicional){
      turnosFiltrados = turnosFiltrados.filter(turno => {
        const fecha = new Date(turno.fecha);
        const fechaHora: FechaHoraPipe = new FechaHoraPipe();
        let cpTurno = turno
        cpTurno.horario = fechaHora.transform(fecha,'horario');
        cpTurno.dia = fechaHora.transform(fecha,'dia');
        cpTurno.fechaCompleta = fechaHora.transform(fecha,'fechaCompleta');
        cpTurno.especialista.horario = undefined;
        return JSON.stringify(cpTurno).toUpperCase().includes(filtroAdicional.toUpperCase())
      });
    }
    return turnosFiltrados;
  }

}
