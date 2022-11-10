import swal from 'sweetalert';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-informe-clinico',
  templateUrl: './informe-clinico.component.html',
  styleUrls: ['./informe-clinico.component.scss']
})
export class InformeClinicoComponent implements OnInit {

  @Input()
    turno: any;

  @Output()
    informeCargado: EventEmitter<any> = new EventEmitter<any>()

  public datoAdicional1: {clave: string, valor: string} | undefined;
  public datoAdicional2: {clave: string, valor: string} | undefined;
  public datoAdicional3: {clave: string, valor: string} | undefined;

  constructor() { }

  ngOnInit(): void {
    if(this.turno.informeClinico == undefined)
      this.turno.informeClinico = {altura: 0, peso: 0, temperatura: 0, presion: 0};
  }

  cargarInforme(dato1?:{clave: string, valor: string}, dato2?:{clave: string, valor: string}, dato3?:{clave: string, valor: string}){
    if(this.turno.informeClinico.altura > 10 && this.turno.informeClinico.altura < 290 &&
       this.turno.informeClinico.peso > 0 && this.turno.informeClinico.peso < 500 &&
       this.turno.informeClinico.temperatura > 20 && this.turno.informeClinico.temperatura < 60 &&
       this.turno.informeClinico.presion > 10 && this.turno.informeClinico.presion < 500){
        if(dato1){
          let informeClinico: string = JSON.stringify(this.turno.informeClinico);
          informeClinico = informeClinico.substring(0,informeClinico.length-1) + ',"'+dato1.clave+'": "'+dato1.valor+'"}'
          if(dato2){
            informeClinico = informeClinico.substring(0,informeClinico.length-1) + ',"'+dato2.clave+'": "'+dato2.valor+'"}'
            if(dato3){
              informeClinico = informeClinico.substring(0,informeClinico.length-1) + ',"'+dato3.clave+'": "'+dato3.valor+'"}'
            }
          }
          this.turno.informeClinico = JSON.parse(informeClinico);
        }
        this.informeCargado.emit(this.turno);
       }
       else{
        swal("Error", "Valide que sus datos sean correctos", "error");
       }
  }

  addDato(dato: number){
    if (dato == 1){
      this.datoAdicional1 = {clave:'', valor:''}
    }
    else if (dato == 2){
      this.datoAdicional2 = {clave:'', valor:''}
    }
    else if (dato == 3){
      this.datoAdicional3 = {clave:'', valor:''}
    }
    else{
      throw new Error('Dato invalido');
    }
  }
}
