import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', redirectTo:'bienvenida',pathMatch:'prefix'},
  {path:'bienvenida', loadChildren: () => import('./modules/bienvenida/bienvenida.module').then(m => m.BienvenidaModule)},
  {path:'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)},
  {path:'registro', loadChildren: () => import('./modules/registro/registro.module').then(m => m.RegistroModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
