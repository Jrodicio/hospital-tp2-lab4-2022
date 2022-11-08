import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaFromNumber'
})
export class FechaFromNumberPipe implements PipeTransform {

  transform(time: number): Date {
    return new Date(time);
  }

}
