import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AltaUsuarioComponent } from './components/alta-usuario/alta-usuario.component';

@NgModule({
  declarations: [
    FooterComponent,
    AltaUsuarioComponent
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
  ],
})
export class SharedModule { }
