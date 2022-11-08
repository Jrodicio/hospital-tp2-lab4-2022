import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrarTurnos'
})
export class FiltrarTurnosPipe implements PipeTransform {

  transform(turnos: any[], filtro: {administrador: boolean, especialista: any, paciente: any, especialidad: string}): any[] {
    console.log("Filtros pipe:",filtro)
    if(filtro.administrador){
      if(filtro.especialista){
        return turnos.filter(turno => turno['especialista'].uid == filtro.especialista.uid);
      }
      else if(filtro.especialidad){
        return turnos.filter(turno => turno['especialidad'] == filtro.especialidad);
      }
      else{
        return turnos;
      }
    }
    if(filtro.especialista && filtro.paciente){
      return turnos.filter(turno => turno['paciente'].uid == filtro.paciente.uid && turno['especialista'].uid == filtro.especialista.uid);
    }
    else if(filtro.especialista && filtro.especialidad){
      return turnos.filter(turno => turno['especialista'].uid == filtro.especialista.uid && turno['especialidad'] == filtro.especialidad);
    }
    else if(filtro.paciente && filtro.especialidad){
      return turnos.filter(turno => turno['paciente'].uid == filtro.paciente.uid && turno['especialidad'] == filtro.especialidad);
    }
    else if(filtro.especialista){
      return turnos.filter(turno => turno['especialista'].uid == filtro.especialista.uid);
    }
    else if(filtro.paciente){
      return turnos.filter(turno => turno['paciente'].uid == filtro.paciente.uid);
    }
    else{
      return [];
    }
  }

}
