import { Component,OnInit} from '@angular/core';
import { FirestoreService } from '../../../../providers/firestore.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss']
})
export class MiPerfilComponent implements OnInit {

  public usuario: any;
  constructor(private firestoreService: FirestoreService,) { }

  ngOnInit(): void {
    this.firestoreService.getDocument('users',JSON.parse(localStorage.getItem('user')!).uid)
    .then(user => {
      this.usuario = user.data();
    })
  }

  public savePDF(): void {
    let PDF = new jsPDF('l', 'mm', 'a4',false);
    PDF.setFont("helvetica");
    PDF.setFontSize(20);
    PDF.text('Historial Clínico de '+this.usuario['nombre']+' '+this.usuario['apellido'],90,10);
    PDF.setFontSize(12);
    const fecha = new Date();
    PDF.text('Fecha de emisión: '+fecha.toLocaleDateString(),220,10);
    var imgLogo = new Image();
    imgLogo.src = '../../../../../assets/images/logo.png';
    PDF.addImage(imgLogo, 'png', 10, 1, 15, 15);
    autoTable(PDF, { html: '#historialClinico', includeHiddenHtml: true, startY:25});
    PDF.save('historial-clinico-'+fecha.getTime()+'.pdf');
  }
}
