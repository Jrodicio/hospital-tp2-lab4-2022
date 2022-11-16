import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FirestoreService } from '../../../../providers/firestore.service';

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.scss']
})
export class DetalleUsuarioComponent implements OnInit, OnChanges {

  @Input()
    usuario: any;

  public perfilLogin: string | null = null;
  public cargandoImg1: boolean;
  public cargandoImg2: boolean;

  constructor(private firestoreService: FirestoreService) {
    this.cargandoImg1 = true;
    this.cargandoImg2 = true;
  }

  ngOnInit(): void {
    this.perfilLogin = localStorage.getItem('userProfile')
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['usuario']){
      this.isLoadingImg(1);
      this.isLoadingImg(2);
    }
  }

  toggleHabilitadoEspecialista(){
    let usuarioAux = this.usuario;
    usuarioAux.habilitado = !usuarioAux.habilitado;
    this.firestoreService.setDocument('users', usuarioAux.uid, usuarioAux)
    .then(()=>{
      this.usuario = usuarioAux;
    });
  }

  isLoadingImg(img: number){
    if(img == 1){
      this.cargandoImg1 = true;
    }
    else{
      this.cargandoImg2 = true;
    }
  }

  isLoadedImg(img: number){
    if(img == 1){
      this.cargandoImg1 = false;
    }
    else{
      this.cargandoImg2 = false;
    }
  }

}
