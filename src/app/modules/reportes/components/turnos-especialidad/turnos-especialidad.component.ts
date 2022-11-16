import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../../providers/firestore.service';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-turnos-especialidad',
  templateUrl: './turnos-especialidad.component.html',
  styleUrls: ['./turnos-especialidad.component.scss']
})
export class TurnosEspecialidadComponent implements OnInit {

  public title: string = 'Cantidad de turnos por especialidad';
  public barChartLegend: boolean = true;
  public barChartPlugins: any[] = [];
  public cargando: boolean = true;

  private arrEspecialidades: string[] = [];
  private turnosSinConfirmar: number[] = [];
  private turnosConfirmados: number[] = [];
  private turnosRealizados: number[] = [];
  private turnosCancelados: number[] = [];
  private turnosRechazados: number[] = [];


  public barChartData: ChartConfiguration<'bar'>['data'] | undefined;

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  constructor(private firestoreService: FirestoreService) {
    this.firestoreService.getDocuments('turnos').forEach(turnos => {
      turnos.forEach(turno => {
        if(!this.arrEspecialidades.includes(turno['especialidad'])){
          this.arrEspecialidades.push(turno['especialidad']);
          this.turnosSinConfirmar.push(0);
          this.turnosConfirmados.push(0);
          this.turnosRealizados.push(0);
          this.turnosCancelados.push(0);
          this.turnosRechazados.push(0);
        }
        if(turno['estado'] === 'Pendiente'){
          this.turnosSinConfirmar[this.arrEspecialidades.indexOf(turno['especialidad'])]++;
        }
        else if(turno['estado'] === 'Confirmado'){
          this.turnosConfirmados[this.arrEspecialidades.indexOf(turno['especialidad'])]++;
        }
        else if(turno['estado'] === 'Realizado'){
          this.turnosRealizados[this.arrEspecialidades.indexOf(turno['especialidad'])]++;
        }
        else if(turno['estado'] === 'Cancelado'){
          this.turnosCancelados[this.arrEspecialidades.indexOf(turno['especialidad'])]++;
        }
        else if(turno['estado'] === 'Rechazado'){
          this.turnosRechazados[this.arrEspecialidades.indexOf(turno['especialidad'])]++;
        }
      });
      this.barChartData = {
        labels: this.arrEspecialidades,
        datasets: [
          { data: this.turnosSinConfirmar, label: 'Turnos sin confirmar' , backgroundColor:'#F4F1BB'},
          { data: this.turnosConfirmados, label: 'Turnos confirmados' , backgroundColor:'#7CC6FE'},
          { data: this.turnosRealizados, label: 'Turnos realizados' , backgroundColor:'#629460'},
          { data: this.turnosCancelados, label: 'Turnos cancelados' , backgroundColor:'#ED6A5A'},
          { data: this.turnosRechazados, label: 'Turnos rechazados' , backgroundColor:'#6F1A07'},
        ]
      };
      setTimeout(()=>{this.cargando = false},1500);
    });
  }

  ngOnInit(): void {
  }
}
