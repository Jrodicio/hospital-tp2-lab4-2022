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

  constructor(
    private firestore: FirestoreService
  ) {
    firestore.getDocuments('users').subscribe((users)=>{
      this.listaUsuarios = users;
    });
  }

  ngOnInit(): void {
  }

  seleccionarUsuario(usuario: any){
    this.usuarioSelected.emit(usuario);
  }
}
