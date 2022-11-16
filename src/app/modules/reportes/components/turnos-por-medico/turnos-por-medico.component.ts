import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../../providers/firestore.service';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-turnos-por-medico',
  templateUrl: './turnos-por-medico.component.html',
  styleUrls: ['./turnos-por-medico.component.scss']
})
export class TurnosPorMedicoComponent implements OnInit {

  public desde: string | undefined;
  public hasta: string | undefined;
  public turnos: any[] = [];

  public mostrar: boolean = false;
  public cargando: boolean = true;

  public doughnutChartOptions: ChartConfiguration['options'] | undefined;

  public doughnutChartData: ChartData<'doughnut', number[], string | string[]> | undefined ;

  public doughnutChartType: ChartType = 'doughnut';

  public doughnutChartPlugins = [ DatalabelsPlugin ];

  constructor(private firestoreService: FirestoreService) {

  }

  ngOnInit(): void {
  }

  generarReport(){
    this.mostrar = false
    setTimeout(()=>this.mostrar = true,50);
    this.cargando = true;
    this.firestoreService.getDocuments('turnos').forEach(turnos => {
      let medicos: string[] = [];
      let qTurnos: number[] = [];

      this.turnos = turnos.filter(turno => turno['fecha']>new Date(this.desde+ ' 00:00:00').getTime() && turno['fecha'] <= new Date(this.hasta+ ' 23:59:59').getTime());
      this.turnos.forEach(turno =>{
        let medico = 'Dr/a. '+turno['especialista'].nombre + ' ' + turno['especialista'].apellido;
        if(!medicos.includes(medico)){
          medicos.push(medico);
          qTurnos.push(0);
        }
        qTurnos[medicos.indexOf(medico)]++;
      });

      this.doughnutChartData = {
        labels: medicos,
        datasets: [ {
          data: qTurnos,
        } ]
      };

      this.doughnutChartOptions = {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          datalabels: {
            formatter: (value) => 'Turnos: '+value,
            font: { size: 30 }
          },
        },
      };
      setTimeout(()=>this.cargando = false,1500);
    });
  }

}
