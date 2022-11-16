import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraficosEstadisticasComponent } from './pages/graficos-estadisticas/graficos-estadisticas.component';

const routes: Routes = [
  {path:'', component: GraficosEstadisticasComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule { }
