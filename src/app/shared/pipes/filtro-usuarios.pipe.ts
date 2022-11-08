import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroUsuarios'
})
export class FiltroUsuariosPipe implements PipeTransform {

  transform(value: any[], filtro: string): any[]{
    if(filtro) {
      const filtrado = value.filter(usuario => (usuario.perfil+usuario.nombre+usuario.apellido+usuario.email+usuario.otraEspecialidad).toUpperCase().indexOf(filtro.toUpperCase()) > -1);
      return filtrado;
    }
    else {
      return value;
    }
  }

}
