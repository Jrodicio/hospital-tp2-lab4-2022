import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { OnlyNoAuthGuard } from './shared/guards/only-no-auth.guard';

const routes: Routes = [
  {path:'', redirectTo:'bienvenida',pathMatch:'prefix'},
  {path:'bienvenida', canActivate:[OnlyNoAuthGuard], loadChildren: () => import('./modules/bienvenida/bienvenida.module').then(m => m.BienvenidaModule)},
  {path:'home', canActivate:[AuthGuard], loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)},
  {path:'registro', canActivate:[OnlyNoAuthGuard], loadChildren: () => import('./modules/registro/registro.module').then(m => m.RegistroModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
