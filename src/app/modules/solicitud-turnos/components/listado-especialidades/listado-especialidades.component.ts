import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FirestoreService } from '../../../../providers/firestore.service';

@Component({
  selector: 'app-listado-especialidades',
  templateUrl: './listado-especialidades.component.html',
  styleUrls: ['./listado-especialidades.component.scss']
})
export class ListadoEspecialidadesComponent implements OnInit {

  @Output()
    especialidadSeleccionada: EventEmitter<string> = new EventEmitter<string>();

  @Input()
   especialidad: string = '';

  public listaEspecialidades: string[] = [];
  public mostrarOtras: boolean = false;
  public listaOtras: string[] = [];
  public filtroEspecialidad: string = 'lo';



  constructor(private firestoreService: FirestoreService) {
    this.firestoreService.getDocuments("users").subscribe(usuarios =>{
      usuarios.forEach((usuario)=>{
        if(usuario['perfil'] == "Especialista"){
          if(usuario['habilitado']){
            if(usuario['cardiologia'] && this.listaEspecialidades.indexOf('Cardiología') == -1){
              this.listaEspecialidades.push('Cardiología');
            }
            if(usuario['oftalmologia'] && this.listaEspecialidades.indexOf('Oftalmología') == -1){
              this.listaEspecialidades.push('Oftalmología');
            }
            if(usuario['otorrinolaringologia'] && this.listaEspecialidades.indexOf('Otorrinolaringología') == -1){
              this.listaEspecialidades.push('Otorrinolaringología');
            }
            if(usuario['traumatologia'] && this.listaEspecialidades.indexOf('Traumatología') == -1){
              this.listaEspecialidades.push('Traumatología');
            }
            if(usuario['otraEspecialidad'].length && this.listaOtras.indexOf(usuario['otraEspecialidad']) == -1){
              this.listaOtras.push(usuario['otraEspecialidad']);
            }
          }
        }
      });
    });

  }

  ngOnInit(): void {
  }

  seleccionar(especialidad: string){
    this.especialidad = especialidad;
    this.especialidadSeleccionada.emit(this.especialidad);
  }

  checkStatus(especialidad: string){
    if(this.especialidad == ''){
      return '';
    }
    else if(this.especialidad == especialidad){
      return 'selected';
    }
    else{
      return 'unselected';
    }
  }

  toggleMostrar(){
    this.mostrarOtras = !this.mostrarOtras;
    if(this.listaOtras.indexOf(this.especialidad)>=0){
      this.seleccionar('');
    }
  }
}
