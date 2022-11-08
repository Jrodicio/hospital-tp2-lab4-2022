import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../../../providers/auth.service';
import { FirestoreService } from '../../../../providers/firestore.service';
import { StorageService } from '../../../../providers/storage.service';
import { CreateUserService } from '../../../../providers/create-user.service';


@Component({
  selector: 'app-alta-especialista',
  templateUrl: './alta-especialista.component.html',
  styleUrls: ['./alta-especialista.component.scss']
})
export class AltaEspecialistaComponent implements OnInit {

  public datosBasicosForm: FormGroup | undefined;
  public especialistaForm: FormGroup;

  public imagenPerfil: File | undefined;

  public errorRegistro:{message: string, opacity: number};
  public especialistaCargando: boolean = false;

  public registroRealizado: boolean = false;

  private captchaValido: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private createUserService: CreateUserService,
    private firestoreService: FirestoreService,
    private storageService: StorageService,
  ){
    this.especialistaForm = this.formBuilder.group({
      traumatologia: new FormControl(false, this.validEspecialidad),
      otorrinolaringologia: new FormControl(false, this.validEspecialidad),
      oftalmologia: new FormControl(false, this.validEspecialidad),
      cardiologia: new FormControl(false, this.validEspecialidad),
      otraEspecialidad: new FormControl('', this.validEspecialidad),
    }, {validator: this.formUpdateValidity});

    this.errorRegistro = {message: '', opacity: 0};
  }

  ngOnInit(): void {
  }

  get fm(){
    return this.especialistaForm.controls;
  }

  get of(){
    return this.datosBasicosForm?.controls!;
  }

  registrarEspecialista(){
    this.errorRegistro = {message: '', opacity: 0};

    if(!this.captchaValido){
      this.mostrarError("Debe validar el CAPTCHA deslizable");
    }
    else if(this.datosBasicosForm?.status == "INVALID" || this.especialistaForm.status == "INVALID"){
      this.mostrarError('Verifique que todos los datos sean correctos y haber seleccionado al menos una especialidad');
    }
    else{
      this.especialistaForm.disable();
      this.datosBasicosForm?.disable();

      const user = {correo: this.of['correo'].value, contraseña: this.of['contraseña'].value};

      this.createUserService.createUser(user)
      .then((userCredential)=>{
        this.storageService.subirImagenPerfil(this.imagenPerfil!, userCredential.user.uid)
        .then(()=>{
          this.storageService.getURLProfile(userCredential.user.uid)
          .then(imgURL =>{
            let especialista = {
              uid: userCredential.user.uid,
              nombre: this.of['nombre'].value,
              apellido: this.of['apellido'].value,
              edad: this.of['edad'].value,
              DNI: this.of['DNI'].value,
              email: this.of['correo'].value,
              imgURL: imgURL,
              traumatologia: this.fm['traumatologia'].value,
              otorrinolaringologia: this.fm['otorrinolaringologia'].value,
              oftalmologia: this.fm['oftalmologia'].value,
              cardiologia: this.fm['cardiologia'].value,
              otraEspecialidad: this.fm['otraEspecialidad'].value,
              habilitado: false,
              perfil: 'Especialista'
            }
            this.firestoreService.setDocument('users', userCredential.user.uid, especialista)
            .then(() => {
              this.createUserService.actualizarPerfil(especialista.nombre, especialista.imgURL);
              this.createUserService.enviarMailVerificacion(userCredential.user);
              this.createUserService.signoutUser();
              this.registroRealizado = true;
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
    this.especialistaForm.enable();
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

  validEspecialidad(control: AbstractControl): ValidationErrors | null{
    if( control.parent?.get('traumatologia')?.value || control.parent?.get('otorrinolaringologia')?.value ||
      control.parent?.get('oftalmologia')?.value || control.parent?.get('cardiologia')?.value ||
      control.parent?.get('otraEspecialidad')?.value.length > 0){
      return null;
    }
    else{
      return {'especialidades-empty': true};
    }
  }

  formUpdateValidity(control: AbstractControl){
    control.get('traumatologia')?.updateValueAndValidity({onlySelf: true});
    control.get('otorrinolaringologia')?.updateValueAndValidity({onlySelf: true});
    control.get('oftalmologia')?.updateValueAndValidity({onlySelf: true});
    control.get('cardiologia')?.updateValueAndValidity({onlySelf: true});
    control.get('otraEspecialidad')?.updateValueAndValidity({onlySelf: true});
  }

  onCaptchaEmitido(valido: boolean){
    this.captchaValido = valido;
  }

}
