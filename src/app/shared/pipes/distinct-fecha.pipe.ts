import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distinctFecha'
})
export class DistinctFechaPipe implements PipeTransform {

  transform(value: Date[]): any {
    let fechasLimpias: Date[] = [];
    value.forEach(fecha => fechasLimpias.push(new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate())));

    let uniqueArray = fechasLimpias.filter(function (fecha, index, fechasArr) {
      if(index == 0 || fechasArr[index].getTime() !== fechasArr[index-1].getTime()){
        return true;
      }
      return false;
    });

  return uniqueArray;
  }
}
