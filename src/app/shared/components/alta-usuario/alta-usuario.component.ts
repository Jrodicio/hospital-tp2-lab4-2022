import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alta-usuario',
  templateUrl: './alta-usuario.component.html',
  styleUrls: ['./alta-usuario.component.scss']
})
export class AltaUsuarioComponent implements OnInit {

  @Output() formModEvent: EventEmitter<FormGroup> = new EventEmitter();
  @Output() fileUploadEvent: EventEmitter<any> = new EventEmitter();

  public altaForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.altaForm = this.formBuilder.group({
      nombre: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(1)
      ])),
      apellido: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(1)
      ])),
      edad: new FormControl('', Validators.compose([
        Validators.min(18),
        Validators.max(120),
      ])),
      DNI: new FormControl('', Validators.compose([
        Validators.min(100000),
        Validators.max(99999999),
      ])),
      correo: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      contraseña: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
      contraseñaConfirm: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required,
        this.confirmContraseña,
      ])),
      imagenPerfil: new FormControl('', Validators.compose([
        Validators.minLength(1),
        Validators.required,
      ])),
    });

   }

  ngOnInit(): void {

    this.formModEvent.emit(this.altaForm);

    this.altaForm.valueChanges.subscribe(()=>{
      this.formModEvent.emit(this.altaForm);
    });
  }

  confirmContraseña(control: AbstractControl): ValidationErrors | null{
    if(control.parent?.get('contraseña')?.value === control.value){
      return null;
    }
    else{
      return {'password-not-match': true};
    }
  }

  get fm(){
    return this.altaForm.controls;
  }

  fileUploadEmmiter($event: any){
    this.fileUploadEvent.emit($event);
  }
}
