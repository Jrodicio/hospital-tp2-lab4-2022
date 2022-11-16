import { Component, OnInit,  } from '@angular/core';
import { FirestoreService } from '../../../../providers/firestore.service';
import { ExportExcelService } from '../../../../providers/export-excel.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  public usuarioSeleccionado: any;
  private turnos: any[] = [];

  constructor(
    private firestore: FirestoreService,
    private exportExcelService: ExportExcelService,
  ) {
    this.firestore.getDocuments('turnos').subscribe((turnos) => {
      this.turnos = turnos;
    });
  }

  ngOnInit(): void {
  }

  onUsuarioSelected(usuario: any){
    this.usuarioSeleccionado = usuario;
    if(usuario){
      if(usuario.perfil === 'Paciente'){
        console.log(1)
        this.exportExcel();
      }
    }
  }

  exportExcel(){
    let body: any[][] = []
    const turnosPaciente = this.turnos.filter(turno => turno['paciente'].uid == this.usuarioSeleccionado.uid).sort((a,b) =>a['fecha']-b['fecha']);

    turnosPaciente.forEach(turno => {
      let row = [
        {
          value: new Date(turno['fecha']).toLocaleString(),
          type: 'string'
        }, {
          value: turno['especialista'].nombre + ' ' + turno['especialista'].apellido,
          type: 'string'
        }, {
          value: turno['paciente'].nombre + ' ' + turno['paciente'].apellido,
          type: 'string'
        }, {
          value: turno['especialidad'],
          type: 'string'
        }
      ];
      body.push(row);
    });

    const headers = ['Fecha','Especialista','Paciente','Especialidad'];
    const nameFile: string = this.usuarioSeleccionado.nombre+'_'+this.usuarioSeleccionado.apellido+'_Turnos-'+new Date().getTime().toString();
    this.exportExcelService.exportXLSX(headers, body, nameFile);
  }

}
