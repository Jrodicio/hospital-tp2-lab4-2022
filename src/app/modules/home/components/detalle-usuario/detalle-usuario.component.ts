import { Component, OnInit, Input } from '@angular/core';
import { FirestoreService } from '../../../../providers/firestore.service';

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.scss']
})
export class DetalleUsuarioComponent implements OnInit {

  @Input()
    usuario: any;

  public perfilLogin: string | null = null;

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.perfilLogin= localStorage.getItem('userProfile')
  }

  toggleHabilitadoEspecialista(){
    let usuarioAux = this.usuario;
    usuarioAux.habilitado = !usuarioAux.habilitado;
    this.firestoreService.setDocument('users', usuarioAux.uid, usuarioAux)
    .then(()=>{
      this.usuario = usuarioAux;
    });
  }
}
