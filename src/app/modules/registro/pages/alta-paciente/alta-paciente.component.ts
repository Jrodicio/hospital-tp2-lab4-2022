import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../../providers/auth.service';
import { FirestoreService } from '../../../../providers/firestore.service';

import { Router } from '@angular/router';
import { StorageService } from '../../../../providers/storage.service';
import { sendEmailVerification } from 'firebase/auth';

@Component({
  selector: 'app-alta-paciente',
  templateUrl: './alta-paciente.component.html',
  styleUrls: ['./alta-paciente.component.scss']
})
export class AltaPacienteComponent implements OnInit {

  public datosBasicosForm: FormGroup | undefined;
  public pacienteForm: FormGroup;

  public imagenPerfil1: File | undefined;
  public imagenPerfil2: File | undefined;

  public errorRegistro:{message: string, opacity: number};
  public pacienteCargando: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private firestoreService: FirestoreService,
    private storageService: StorageService,
  ) {
    this.pacienteForm = this.formBuilder.group({
      imagenPerfil2: new FormControl('', Validators.compose([
        Validators.minLength(1),
        Validators.required
      ])),
      obraSocial: new FormControl('', Validators.compose([
        Validators.minLength(1),
        Validators.required
      ])),
    });

    this.errorRegistro = {message: '', opacity: 0};
   }

  ngOnInit(): void {
  }

  get fm(){
    return this.pacienteForm.controls;
  }

  get of(){
    return this.datosBasicosForm?.controls!;
  }

  registrarPaciente(){
    this.errorRegistro = {message: '', opacity: 0};

    if(this.datosBasicosForm?.status == "INVALID" || this.pacienteForm.status == "INVALID"){
      this.mostrarError('Verifique que todos los datos sean correctos');
    }
    else{
      this.pacienteForm.disable();
      this.datosBasicosForm?.disable();

      const user = {correo: this.of['correo'].value, contraseña: this.of['contraseña'].value};
      this.authService.createUser(user)
      .then((userCredential)=>{
        this.storageService.subirImagenPerfil(this.imagenPerfil1!, userCredential.user.uid)
        .then(()=>{
          this.storageService.getURLProfile(userCredential.user.uid)
          .then(imgURL =>{
            this.storageService.subirImagenPerfil(this.imagenPerfil2!, '2-'+userCredential.user.uid)
            .then(()=>{
              this.storageService.getURLProfile(userCredential.user.uid)
              .then(imgURL2 =>{
                let paciente = {
                  uid: userCredential.user.uid,
                  nombre: this.of['nombre'].value,
                  apellido: this.of['apellido'].value,
                  edad: this.of['edad'].value,
                  DNI: this.of['DNI'].value,
                  email: this.of['correo'].value,
                  imgURL: imgURL,
                  imgURL2: imgURL2,
                  obraSocial: this.fm['obraSocial'].value,
                  perfil: 'Paciente'
                }
                this.firestoreService.setDocument('users', userCredential.user.uid, paciente)
                .then(() => {
                  this.authService.actualizarPerfil(paciente.nombre, paciente.imgURL);
                  this.authService.enviarMailVerificacion(userCredential.user);
                  this.authService.signoutUser();
                })
                .catch((error)=>{
                  this.errorHandler(error);
                });
              })
              .catch((error)=>{
                this.errorHandler(error);
              });
            })
            .catch((error)=>{
              this.errorHandler(error);
            });
          })
          .catch((error)=>{
            this.errorHandler(error);
          });
        })
        .catch((error)=>{
          this.errorHandler(error);
        });
      })
      .catch((error)=>{
        this.errorHandler(error);
      })
      .finally(()=>{
        this.pacienteForm.enable();
        this.datosBasicosForm?.enable();
      });
    }
  }

  errorHandler(error: any){
    console.log("ERROR:",error);
    if (error.code == 'auth/email-already-in-use'){
      this.mostrarError('El correo ya se encuentra registrado.');
    }
    else{
      console.error(error.code);
      this.mostrarError('No se ha podido registrar al usuario.');
    }
  }

  ocultarError(){
    if (this.errorRegistro.opacity > 0){
      setTimeout(()=>{
        this.errorRegistro.opacity -= 0.01
        this.ocultarError();
      }, 10)
    }
    else {
      this.errorRegistro.message = '';
    }
  }

  mostrarError(message:string){
    this.errorRegistro.message = message;
    if (this.errorRegistro.opacity < 1){
      setTimeout(()=>{
        this.errorRegistro.opacity += 0.005
        this.mostrarError(message);
      }, 1)
    }
    else {
      setTimeout(() =>{
        this.ocultarError();
      }, 1500);
    }
  }

  onFormMod(formReceived: FormGroup){
    this.datosBasicosForm = formReceived;
  }

  onUpload($event: any, perfil1: boolean){
    const file = $event.target.files[0] as File;
    console.log(file);
    if(perfil1){
      this.imagenPerfil1 = file;
    }
    else{
      this.imagenPerfil2 = file;
    }
  }
}
