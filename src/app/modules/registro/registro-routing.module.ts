import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from '../registro/pages/registro/registro.component';
import { AltaPacienteComponent } from './pages/alta-paciente/alta-paciente.component';
import { AltaEspecialistaComponent } from './pages/alta-especialista/alta-especialista.component';

const routes: Routes = [
  {path:'', component:RegistroComponent},
  {path:'alta-paciente', component:AltaPacienteComponent},
  {path:'alta-especialista', component:AltaEspecialistaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroRoutingModule { }
