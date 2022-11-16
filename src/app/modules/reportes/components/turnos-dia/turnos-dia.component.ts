import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { FirestoreService } from '../../../../providers/firestore.service';

@Component({
  selector: 'app-turnos-dia',
  templateUrl: './turnos-dia.component.html',
  styleUrls: ['./turnos-dia.component.scss']
})
export class TurnosDiaComponent implements OnInit {

  public cargando: boolean = true;
  public lineChartData: ChartConfiguration['data'] | undefined;
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    plugins: {
      legend: { display: true },
    },
  }

  public lineChartType: ChartType = 'line';
  constructor(private firestoreService: FirestoreService) {
    this.firestoreService.getDocuments('turnos').forEach(turnos =>{
      let cantTurnos: number[] = [0];
      let dias: string[] = ['Primer día'];
      turnos.sort((a,b)=>a['fecha'] - b['fecha']).forEach(turno => {
        const strFecha = new Date(turno['fecha']).toLocaleDateString();
        if(!dias.includes(strFecha)){
          dias.push(strFecha);
          cantTurnos.push(0);
        }
        cantTurnos[dias.indexOf(strFecha)]++;
      });
      cantTurnos.push(0);
      dias.push('Último día')
      this.lineChartData = {
        datasets: [
        {
          data: cantTurnos,
          label: 'Turnos',
          backgroundColor: '#A1CDA8',
          borderColor: '#627264',
          pointBackgroundColor: '#004777',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: 'white',
          pointHoverBorderColor: '#004777',
          fill: 'origin',
        }],
        labels: dias
      };
      setTimeout(()=>{
        this.cargando = false
      },1500);
    });
  }

  ngOnInit(): void {
  }
}
