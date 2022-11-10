import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AltaPacienteComponent } from '../registro/pages/alta-paciente/alta-paciente.component';
import { AltaAdministradorComponent } from './components/alta-administrador/alta-administrador.component';
import { AltaEspecialistaComponent } from '../registro/pages/alta-especialista/alta-especialista.component';
import { AdminGuard } from '../../shared/guards/admin.guard';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { MiPerfilComponent } from './pages/mi-perfil/mi-perfil.component';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { MisPacientesComponent } from './pages/mis-pacientes/mis-pacientes.component';
import { EspecialistaGuard } from '../../shared/guards/especialista.guard';

const routes: Routes = [

  {path:'', component: HomeComponent, children:[
    {path:'usuarios', component:UsuariosComponent, canActivate:[AdminGuard], children:[
      {path:'paciente', component:AltaPacienteComponent},
      {path:'especialista', component:AltaEspecialistaComponent},
      {path:'administrador', component:AltaAdministradorComponent},
    ]},

    {path:'mi-perfil', component:MiPerfilComponent},
    {path:'mis-pacientes',canActivate:[EspecialistaGuard],component:MisPacientesComponent},

    {path:'solicitar-turno', loadChildren: () => import('../solicitud-turnos/solicitud-turnos.module').then(m => m.SolicitudTurnosModule)},
    {path:'turnos', loadChildren: () => import('../mis-turnos/mis-turnos.module').then(m => m.MisTurnosModule)},
    {path:'mis-turnos', loadChildren: () => import('../mis-turnos/mis-turnos.module').then(m => m.MisTurnosModule)},

  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
