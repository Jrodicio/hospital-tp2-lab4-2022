import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AltaUsuarioComponent } from './components/alta-usuario/alta-usuario.component';
import { CaptchaComponent } from './components/captcha/captcha.component';
import { FiltrarEspecialidadesPipe } from './pipes/filtrar-especialidades.pipe';
import { FiltrarEspecialistasPipe } from './pipes/filtrar-especialistas.pipe';
import { FechaHoraPipe } from './pipes/fecha-hora.pipe';
import { DistinctFechaPipe } from './pipes/distinct-fecha.pipe';
import { FiltrarFechaPipe } from './pipes/filtrar-fecha.pipe';
import { FiltroUsuariosPipe } from './pipes/filtro-usuarios.pipe';
import { FiltrarPacientesPipe } from './pipes/filtrar-pacientes.pipe';
import { FiltrarTurnosPipe } from './pipes/filtrar-turnos.pipe';
import { FechaFromNumberPipe } from './pipes/fecha-from-number.pipe';
import { DefaultImageDirective } from './directives/default-image.directive';
import { RelativeLoaderDirective } from './directives/relative-loader.directive';
import { RowHoverDirective } from './directives/row-hover.directive';

@NgModule({
  declarations: [
    FooterComponent,
    AltaUsuarioComponent,
    CaptchaComponent,
    FiltrarEspecialidadesPipe,
    FiltrarEspecialistasPipe,
    FechaHoraPipe,
    DistinctFechaPipe,
    FiltrarFechaPipe,
    FiltroUsuariosPipe,
    FiltrarPacientesPipe,
    FiltrarTurnosPipe,
    FechaFromNumberPipe,
    DefaultImageDirective,
    RelativeLoaderDirective,
    RowHoverDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    FooterComponent,
    AltaUsuarioComponent,
    FormsModule,
    ReactiveFormsModule,
    CaptchaComponent,
    FiltrarEspecialidadesPipe,
    FiltrarEspecialistasPipe,
    FechaHoraPipe,
    DistinctFechaPipe,
    FiltrarFechaPipe,
    FiltroUsuariosPipe,
    FiltrarPacientesPipe,
    FiltrarTurnosPipe,
    FechaFromNumberPipe,
    DefaultImageDirective,
    RelativeLoaderDirective,
    RowHoverDirective,
  ],
})
export class SharedModule { }
