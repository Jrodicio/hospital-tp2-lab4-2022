import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../../providers/firestore.service';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-turnos-finalizados-por-medico',
  templateUrl: './turnos-finalizados-por-medico.component.html',
  styleUrls: ['./turnos-finalizados-por-medico.component.scss']
})
export class TurnosFinalizadosPorMedicoComponent implements OnInit {
  public desde: string | undefined;
  public hasta: string | undefined;
  public turnos: any[] = [];

  public mostrar: boolean = false;
  public cargando: boolean = true;

  public pieChartOptions: ChartConfiguration['options'] | undefined;

  public pieChartData: ChartData<'pie', number[], string | string[]> | undefined ;

  public pieChartType: ChartType = 'pie';

  public pieChartPlugins = [ DatalabelsPlugin ];

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

      this.turnos = turnos.filter(turno => turno['estado'] === 'Realizado' && turno['fecha']>new Date(this.desde+ ' 00:00:00').getTime() && turno['fecha'] <= new Date(this.hasta+ ' 23:59:59').getTime());
      this.turnos.forEach(turno =>{
        let medico = 'Dr/a. '+turno['especialista'].nombre + ' ' + turno['especialista'].apellido;
        if(!medicos.includes(medico)){
          medicos.push(medico);
          qTurnos.push(0);
        }
        qTurnos[medicos.indexOf(medico)]++;
      });

      this.pieChartData = {
        labels: medicos,
        datasets: [ {
          data: qTurnos,
        } ]
      };

      this.pieChartOptions = {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          datalabels: {
            formatter: (value) => 'Turnos finalizados: '+value,
            font: { size: 30 }
          },
        },
      };
      setTimeout(()=>this.cargando = false,1500);
    });
  }

}
