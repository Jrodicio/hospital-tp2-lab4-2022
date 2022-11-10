import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisTurnosRoutingModule } from './mis-turnos-routing.module';
import { TurnosPacienteComponent } from './pages/turnos-paciente/turnos-paciente.component';
import { TurnosEspecialistaComponent } from './pages/turnos-especialista/turnos-especialista.component';
import { ListadoTurnosComponent } from './components/listado-turnos/listado-turnos.component';
import { SharedModule } from '../../shared/shared.module';
import { TurnosComponent } from './pages/turnos/turnos.component';
import { InformeClinicoComponent } from './components/informe-clinico/informe-clinico.component';


@NgModule({
  declarations: [
    TurnosPacienteComponent,
    TurnosEspecialistaComponent,
    ListadoTurnosComponent,
    TurnosComponent,
    InformeClinicoComponent
  ],
  imports: [
    CommonModule,
    MisTurnosRoutingModule,
    SharedModule
  ]
})
export class MisTurnosModule { }
