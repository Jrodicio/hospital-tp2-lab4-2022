import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrarEspecialistas'
})
export class FiltrarEspecialistasPipe implements PipeTransform {

  transform(value: any[], filtro: any): any[]{
    if(filtro) {
      const especialistas = value.filter(user => (user.perfil).indexOf('Especialist') > -1);
      const filtrado = especialistas.filter(especialista => especialista[filtro.replace(filtro, filtro.toLowerCase()).replace('í','i')] || especialista['otraEspecialidad'] == filtro);
      return filtrado;
    }
    else {
      return value;
    }
  }

}
