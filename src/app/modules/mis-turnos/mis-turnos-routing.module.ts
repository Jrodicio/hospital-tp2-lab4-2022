import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TurnosPacienteComponent } from './pages/turnos-paciente/turnos-paciente.component';
import { TurnosEspecialistaComponent } from './pages/turnos-especialista/turnos-especialista.component';
import { PacienteGuard } from '../../shared/guards/paciente.guard';
import { EspecialistaGuard } from '../../shared/guards/especialista.guard';
import { AdminGuard } from '../../shared/guards/admin.guard';
import { TurnosComponent } from './pages/turnos/turnos.component';

const routes: Routes = [
  {path:'Paciente', canActivate:[PacienteGuard] ,component:TurnosPacienteComponent},
  {path:'Especialista', canActivate:[EspecialistaGuard], component:TurnosEspecialistaComponent},
  {path:'', canActivate:[AdminGuard], component:TurnosComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MisTurnosRoutingModule { }
