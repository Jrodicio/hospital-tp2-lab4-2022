import { Component, Output, EventEmitter, Input , OnChanges, SimpleChanges} from '@angular/core';
import { FirestoreService } from '../../../../providers/firestore.service';

@Component({
  selector: 'app-listado-especialistas',
  templateUrl: './listado-especialistas.component.html',
  styleUrls: ['./listado-especialistas.component.scss']
})
export class ListadoEspecialistasComponent {
  @Output()
    especialistaSeleccionado: EventEmitter<any> = new EventEmitter<any>();

  @Input()
    especialidad: string = '';
  @Input()
    especialista: any;

  public listaEspecialistas: any[] = [];

  constructor(private firestoreService: FirestoreService) {
    this.firestoreService.getDocuments("users").subscribe(users =>{
      this.listaEspecialistas = users;
    });
  }

  seleccionar(especialista: any){
    this.especialista = especialista;
    this.especialistaSeleccionado.emit(this.especialista);
  }

  checkStatus(especialista: any){
    if(this.especialista === undefined){
      return '';
    }
    else if(this.especialista == especialista){
      return 'selected';
    }
    else{
      return 'unselected';
    }
  }

}
