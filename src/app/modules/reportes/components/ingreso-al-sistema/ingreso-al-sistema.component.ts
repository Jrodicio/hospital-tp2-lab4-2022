import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../../providers/firestore.service';

@Component({
  selector: 'app-ingreso-al-sistema',
  templateUrl: './ingreso-al-sistema.component.html',
  styleUrls: ['./ingreso-al-sistema.component.scss']
})
export class IngresoAlSistemaComponent implements OnInit {


  public listadoLogs: any[] = [];
  public cargando: boolean = true;
  constructor(private firestoreService: FirestoreService) {
    this.firestoreService.getDocuments('logs').subscribe((logs)=>{
      this.listadoLogs = logs.sort((a,b)=> a['fecha'] - b['fecha']);
    });
  }

  ngOnInit(): void {
    setTimeout(()=>this.cargando = false,1500)
  }
}
