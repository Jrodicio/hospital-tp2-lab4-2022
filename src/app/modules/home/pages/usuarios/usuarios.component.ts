import { Component, OnInit,  } from '@angular/core';
import { FirestoreService } from '../../../../providers/firestore.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  public usuarioSeleccionado: any;

  constructor(
    private firestore: FirestoreService
  ) {
  }

  ngOnInit(): void {
  }

  onUsuarioSelected(usuario: any){
    this.usuarioSeleccionado = usuario;
  }
}
