import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroRoutingModule } from './registro-routing.module';
import { RegistroComponent } from '../registro/pages/registro/registro.component';
import { AltaPacienteComponent } from './pages/alta-paciente/alta-paciente.component';
import { AltaEspecialistaComponent } from './pages/alta-especialista/alta-especialista.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    RegistroComponent,
    AltaPacienteComponent,
    AltaEspecialistaComponent
  ],
  imports: [
    CommonModule,
    RegistroRoutingModule,
    SharedModule
  ]
})
export class RegistroModule { }
