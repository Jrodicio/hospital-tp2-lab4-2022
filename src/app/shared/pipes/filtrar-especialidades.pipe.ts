import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrarEspecialidades'
})
export class FiltrarEspecialidadesPipe implements PipeTransform {

  transform(value: string[], filtro: string): string[]{
    if(filtro) {
      console.log("filtro:",filtro);
      let filtrado: string[] = [];
      console.log("value:",value);
      debugger;
      value.forEach((especialidad)=>{

        if(especialidad.toUpperCase().includes(filtro.toUpperCase())){
          filtrado.push(especialidad);
        }
      });
      return filtrado;
    }
    else {
      return value;
    }
  }

}
