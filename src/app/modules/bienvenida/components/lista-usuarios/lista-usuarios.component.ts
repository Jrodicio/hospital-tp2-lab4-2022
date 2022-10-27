import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FirestoreService } from '../../../../providers/firestore.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit {

  @Output()
    usuarioSelected: EventEmitter<string> = new EventEmitter();

  public listaUsuarios: any[] = [];
  public listaUid: any[] = [
    {uid:'5wGzPb2hvbWxngbxYlCJ8vW3Aij2'},
    {uid:'7vo8jXtuYJeThTFH63miaAsLK3x2'},
    {uid:'MTQJbT5gdYhScyXI1EHUtrjB3XF3'},
    {uid:'BYauTOtLVZTvCkFo0aZZvxhTguR2'},
    {uid:'liCcJp4YSHXlgRFcryBsH3vvYtv2'},
    {uid:'xMXGHbpwQNRZwr0bsu2b0BlDmR12'},];
  constructor(
    private firestoreService: FirestoreService
  ) {
    this.listaUid.forEach(element =>{
      let usuario: {correo: string, imgURL: string, perfil: string} = {correo: '', imgURL: '', perfil: ''};
      firestoreService.getDocument('users',element.uid)
      .then(userData => {
        usuario.correo = userData.get('email');
        usuario.imgURL = userData.get('imgURL');
        usuario.perfil = userData.get('perfil');
        this.listaUsuarios.push(usuario);
      });
    });
  }

  ngOnInit(): void {
  }

  seleccionarUsuario(usuario: any){
    console.log("seleccionado el usuario:", usuario);
    this.usuarioSelected.emit(usuario.correo);
  }

}
