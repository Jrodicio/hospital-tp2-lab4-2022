import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrarPacientes'
})
export class FiltrarPacientesPipe implements PipeTransform {

  transform(value: any[], filtro: string): any[]{
    if(filtro) {
      return value.filter(usuario => usuario.perfil === 'Paciente' && ((usuario.nombre.toUpperCase().indexOf(filtro.toUpperCase()) > -1) || (usuario.apellido.toUpperCase().indexOf(filtro.toUpperCase()) > -1)));
    }
    return value.filter(usuario => usuario.perfil === 'Paciente')
  }

}
