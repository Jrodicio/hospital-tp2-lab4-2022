import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesRoutingModule } from './reportes-routing.module';
import { GraficosEstadisticasComponent } from './pages/graficos-estadisticas/graficos-estadisticas.component';
import { SharedModule } from '../../shared/shared.module';
import { IngresoAlSistemaComponent } from './components/ingreso-al-sistema/ingreso-al-sistema.component';
import { NgChartsModule } from 'ng2-charts';
import { TurnosEspecialidadComponent } from './components/turnos-especialidad/turnos-especialidad.component';
import { TurnosDiaComponent } from './components/turnos-dia/turnos-dia.component';
import { TurnosPorMedicoComponent } from './components/turnos-por-medico/turnos-por-medico.component';
import { TurnosFinalizadosPorMedicoComponent } from './components/turnos-finalizados-por-medico/turnos-finalizados-por-medico.component';

@NgModule({
  declarations: [
    GraficosEstadisticasComponent,
    IngresoAlSistemaComponent,
    TurnosEspecialidadComponent,
    TurnosDiaComponent,
    TurnosPorMedicoComponent,
    TurnosFinalizadosPorMedicoComponent
  ],
  imports: [
    CommonModule,
    ReportesRoutingModule,
    SharedModule,
    NgChartsModule,
  ]
})
export class ReportesModule { }
