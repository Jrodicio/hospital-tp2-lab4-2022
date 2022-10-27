import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../../shared/shared.module';
import { NavSidebartComponent } from './components/nav-sidebart/nav-sidebart.component';
import { AltaAdministradorComponent } from './pages/alta-administrador/alta-administrador.component';
import { SeleccionAltaComponent } from './pages/seleccion-alta/seleccion-alta.component';
import { RegistroModule } from '../registro/registro.module';


@NgModule({
  declarations: [
    HomeComponent,
    NavSidebartComponent,
    AltaAdministradorComponent,
    SeleccionAltaComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    RegistroModule
  ]
})
export class HomeModule { }
