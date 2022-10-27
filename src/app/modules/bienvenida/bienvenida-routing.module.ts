import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { RegistroComponent } from '../registro/pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [

  {path:'', component: WelcomeComponent},
  {path:'login', component:LoginComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BienvenidaRoutingModule { }
