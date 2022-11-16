import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FirestoreService } from '../../../../providers/firestore.service';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.scss']
})
export class ListadoUsuariosComponent implements OnInit {

  @Output()
    usuarioSelected: EventEmitter<any> = new EventEmitter();

  public listaUsuarios: any[]= [];
  public perfilFiltro: string = '';
  public cargando: boolean = true;

  constructor(
    private firestore: FirestoreService
  ) {
    firestore.getDocuments('users').subscribe((users)=>{
      this.listaUsuarios = users;
    });
  }

  ngOnInit(): void {
    setTimeout(()=>{
      this.cargando=false
    },2000);

  }

  seleccionarUsuario(usuario: any){
    this.usuarioSelected.emit('');
    setTimeout(()=>{
      this.usuarioSelected.emit(usuario);
    },5);
  }
}
