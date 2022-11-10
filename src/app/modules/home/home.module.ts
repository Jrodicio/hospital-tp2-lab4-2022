import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../../shared/shared.module';
import { NavSidebartComponent } from './components/nav-sidebart/nav-sidebart.component';
import { AltaAdministradorComponent } from './components/alta-administrador/alta-administrador.component';
import { SeleccionAltaComponent } from './components/seleccion-alta/seleccion-alta.component';
import { RegistroModule } from '../registro/registro.module';
import { RouterModule } from '@angular/router';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ListadoUsuariosComponent } from './components/listado-usuarios/listado-usuarios.component';
import { DetalleUsuarioComponent } from './components/detalle-usuario/detalle-usuario.component';
import { MiPerfilComponent } from './pages/mi-perfil/mi-perfil.component';
import { MisHorariosComponent } from './components/mis-horarios/mis-horarios.component';
import { HistorialClinicoComponent } from './components/historial-clinico/historial-clinico.component';
import { MisPacientesComponent } from './pages/mis-pacientes/mis-pacientes.component';
import { ListadoPacientesComponent } from './components/listado-pacientes/listado-pacientes.component';


@NgModule({
  declarations: [
    HomeComponent,
    NavSidebartComponent,
    AltaAdministradorComponent,
    SeleccionAltaComponent,
    UsuariosComponent,
    ListadoUsuariosComponent,
    DetalleUsuarioComponent,
    MiPerfilComponent,
    MisHorariosComponent,
    HistorialClinicoComponent,
    MisPacientesComponent,
    ListadoPacientesComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    RegistroModule
  ]
})
export class HomeModule { }
