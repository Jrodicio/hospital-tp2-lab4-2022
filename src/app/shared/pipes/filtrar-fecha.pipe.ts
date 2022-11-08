import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrarFecha'
})
export class FiltrarFechaPipe implements PipeTransform {

  transform(value: Date[], fechaFiltro: Date): any {

    let onlyOneDay = value.filter(function (fecha) {
      if(fecha.getFullYear() === fechaFiltro.getFullYear() && fecha.getMonth() === fechaFiltro.getMonth() && fecha.getDate() === fechaFiltro.getDate()){
        return true;
      }
      return false;
    });

  return onlyOneDay;
  }

}
