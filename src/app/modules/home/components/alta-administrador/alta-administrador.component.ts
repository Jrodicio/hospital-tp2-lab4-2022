import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../../../../providers/auth.service';
import { FirestoreService } from '../../../../providers/firestore.service';
import { StorageService } from '../../../../providers/storage.service';
import { CreateUserService } from '../../../../providers/create-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alta-administrador',
  templateUrl: './alta-administrador.component.html',
  styleUrls: ['./alta-administrador.component.scss']
})
export class AltaAdministradorComponent implements OnInit {

  public datosBasicosForm: FormGroup | undefined;
  public imagenPerfil: File | undefined;

  public errorRegistro:{message: string, opacity: number};
  public administradorCargando: boolean = false;

  public registroRealizado: boolean = false;

  private captchaValido: boolean = false;

  constructor(
    private createUserService: CreateUserService,
    private firestoreService: FirestoreService,
    private storageService: StorageService,
  ) {
    this.errorRegistro = {message: '', opacity: 0};
  }

  ngOnInit(): void {
  }

  get of(){
    return this.datosBasicosForm?.controls!;
  }

  registrarAdministrador(){
    this.errorRegistro = {message: '', opacity: 0};

    if(!this.captchaValido){
      this.mostrarError("Debe validar el CAPTCHA");
    }
    else if(this.datosBasicosForm?.status == "INVALID"){
      this.mostrarError('Verifique que todos los datos sean correctos y haber seleccionado al menos una especialidad');
    }
    else{
      this.datosBasicosForm?.disable();

      const user = {correo: this.of['correo'].value, contraseña: this.of['contraseña'].value};

      this.createUserService.createUser(user)
      .then((userCredential)=>{
        this.storageService.subirImagenPerfil(this.imagenPerfil!, userCredential.user.uid)
        .then(()=>{
          this.storageService.getURLProfile(userCredential.user.uid)
          .then(imgURL =>{
            let administrador = {
              uid: userCredential.user.uid,
              nombre: this.of['nombre'].value,
              apellido: this.of['apellido'].value,
              edad: this.of['edad'].value,
              DNI: this.of['DNI'].value,
              email: this.of['correo'].value,
              imgURL: imgURL,
              perfil: 'Administrador'
            }
            this.firestoreService.setDocument('users', userCredential.user.uid, administrador)
            .then(() => {
              this.createUserService.actualizarPerfil(administrador.nombre, administrador.imgURL);
              this.createUserService.enviarMailVerificacion(userCredential.user);
              this.createUserService.signoutUser();
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
    this.datosBasicosForm?.enable();
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

  onUpload($event: any){
    const file = $event.target.files[0] as File;
    this.imagenPerfil = file;
  }

  onCaptchaEmitido(valido: boolean){
    this.captchaValido = valido;
  }
}
