import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaHora'
})
export class FechaHoraPipe implements PipeTransform {

  transform(value: Date, formato: string): string {
    let fecha: string = '';

    switch (formato) {
      case 'horario':
        fecha = value.getHours().toString().padStart(2,'0')+':'+value.getMinutes().toString().padStart(2,'0');
        break;
      case 'dia':
        switch (value.getDay()) {
          case 0:
            fecha = 'Domingo'
            break;
          case 1:
            fecha = 'Lunes'
            break;
          case 2:
            fecha = 'Martes'
            break;
          case 3:
            fecha = 'Miércoles'
            break;
          case 4:
            fecha = 'Jueves'
            break;
          case 5:
            fecha = 'Viernes'
            break;
          case 6:
            fecha = 'Sábado'
            break;
        }
        break;
      case 'fechaCompleta':
        fecha = value.getDate().toString().padStart(2,'0')+'/'+(value.getMonth()+1).toString().padStart(2,'0')+'/'+value.getFullYear().toString();
        break;

      default:
        fecha = value.toDateString();
        break;
    }

    return fecha;
  }

}
