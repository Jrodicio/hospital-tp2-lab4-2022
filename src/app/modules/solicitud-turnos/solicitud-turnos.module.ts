import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudTurnosRoutingModule } from './solicitud-turnos-routing.module';
import { ListadoTurnosDisponiblesComponent } from './components/listado-turnos-disponibles/listado-turnos-disponibles.component';
import { ListadoEspecialistasComponent } from './components/listado-especialistas/listado-especialistas.component';
import { SolicitarTurnoComponent } from './pages/solicitar-turno/solicitar-turno.component';
import { ListadoEspecialidadesComponent } from './components/listado-especialidades/listado-especialidades.component';
import { SharedModule } from '../../shared/shared.module';
import { ListadoPacientesComponent } from './components/listado-pacientes/listado-pacientes.component';


@NgModule({
  declarations: [
    ListadoTurnosDisponiblesComponent,
    ListadoEspecialistasComponent,
    SolicitarTurnoComponent,
    ListadoEspecialidadesComponent,
    ListadoPacientesComponent
  ],
  imports: [
    CommonModule,
    SolicitudTurnosRoutingModule,
    SharedModule
  ]
})
export class SolicitudTurnosModule { }
