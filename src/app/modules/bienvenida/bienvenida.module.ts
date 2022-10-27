import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BienvenidaRoutingModule } from './bienvenida-routing.module';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LoginComponent } from './pages/login/login.component';
import { SharedModule } from '../../shared/shared.module';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';


@NgModule({
  declarations: [
    WelcomeComponent,
    LoginComponent,
    ListaUsuariosComponent,
  ],
  imports: [
    CommonModule,
    BienvenidaRoutingModule,
    SharedModule
  ]
})
export class BienvenidaModule { }
