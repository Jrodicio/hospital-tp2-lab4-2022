import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../../providers/firestore.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss']
})
export class MiPerfilComponent implements OnInit {

  public usuario: any;
  constructor(private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.firestoreService.getDocument('users',JSON.parse(localStorage.getItem('user')!).uid)
    .then(user => {
      this.usuario = user.data();
    })
  }

}
