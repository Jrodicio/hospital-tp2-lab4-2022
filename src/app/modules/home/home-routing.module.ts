import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AltaPacienteComponent } from '../registro/pages/alta-paciente/alta-paciente.component';
import { AltaAdministradorComponent } from './pages/alta-administrador/alta-administrador.component';
import { SeleccionAltaComponent } from './pages/seleccion-alta/seleccion-alta.component';
import { AltaEspecialistaComponent } from '../registro/pages/alta-especialista/alta-especialista.component';
import { AdminGuard } from '../../guards/admin.guard';

const routes: Routes = [
  {path:'', component: HomeComponent, children:[
    {path:'alta-paciente', component:AltaPacienteComponent, canActivate:[AdminGuard]},
    {path:'alta-especialista', component:AltaEspecialistaComponent, canActivate:[AdminGuard]},
    {path:'alta-administrador', component:AltaAdministradorComponent, canActivate:[AdminGuard]},
    {path:'altas', component:SeleccionAltaComponent, canActivate:[AdminGuard]},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
