import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-graficos-estadisticas',
  templateUrl: './graficos-estadisticas.component.html',
  styleUrls: ['./graficos-estadisticas.component.scss']
})
export class GraficosEstadisticasComponent implements OnInit {

  public reporteMostrar: string[] = [];
  constructor() {
  }

  ngOnInit(): void {
  }

  mostrarReporte(reporte: string, element: any){
    if(element.target.classList.contains('collapsed')){
      this.reporteMostrar.splice(this.reporteMostrar.indexOf(reporte),1);
    }
    else{
      this.reporteMostrar.push(reporte);
    }
  }

  descargarPDF(titulo: string, elementId: string, tipo: string): void {
    let PDF = new jsPDF('l', 'px', 'a4', false);
    PDF.setFont("helvetica");
    PDF.setFontSize(20);
    PDF.text(titulo,200,40);
    PDF.setFontSize(12);
    const fecha = new Date();
    PDF.text(fecha.toLocaleDateString(),500,40);
    var imgLogo = new Image();
    imgLogo.src = '../../../../../assets/images/logo.png';
    PDF.addImage(imgLogo, 'png', 15, 5, 40, 40);
    if(tipo === 'canvas'){
      html2canvas(document.getElementById(elementId)!)
      .then(canvas=>{
        console.log(canvas)
        PDF.addImage(canvas.toDataURL('image/png'),'JPEG',15, 60, 600, 300);
        PDF.save(titulo+' - '+fecha.getTime()+'.pdf');
      });
    }
    else if(tipo === 'tabla'){
      autoTable(PDF, { html: '#'+elementId, includeHiddenHtml: true ,startY:70});
      PDF.save(titulo+' - '+fecha.getTime()+'.pdf');
    }
    else if(tipo === 'canvas1:1'){
      html2canvas(document.getElementById(elementId)!)
      .then(canvas=>{
        console.log(canvas)
        PDF.addImage(canvas.toDataURL('image/png'),'JPEG',130, 60, 370, 370);
        PDF.save(titulo+' - '+fecha.getTime()+'.pdf');
      });
    }
  }
}
