import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../../../providers/auth.service';
import { FirestoreService } from '../../../../providers/firestore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public estaCargando: boolean = false;
  public loginForm: FormGroup;
  public errorLogin:{message: string, opacity: number};
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private router: Router,
  ) {
    this.loginForm = this.formBuilder.group({
      correo: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ])),
      contrasena: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });

    this.errorLogin = {message: '', opacity: 0};
   }

  ngOnInit(): void {
  }

  get fm(){
    return this.loginForm.controls;
  }

  cargarCredencialesAdmin(){
    this.fm['correo'].setValue('administrador@clinicaonline.com');
    this.fm['contrasena'].setValue('123456');
  }

  loguearUsuario(){
    this.estaCargando = true;
    this.errorLogin = {message: '', opacity: 0};
    let user = {correo: this.fm['correo'].value.toString(), contraseña: this.fm['contrasena'].value.toString()};
    this.authService.signinUser(user)
      .then((response)=>{
        this.firestoreService.getDocument('users', response.user.uid)
        .then(user => {
          if(response.user.emailVerified || user.get('perfil') === "Administrador"){
            const logIngreso = {usuario: user.data(), ts: new Date().getTime()};
            this.firestoreService.addData('logs', logIngreso);
            this.router.navigate(['/home']);
          }
          else{
            this.authService.signoutUser();
            this.mostrarError('Su correo no fue validado, verifique su casilla.');
          }
          this.estaCargando = false
        })
      }).catch((error) => {
        if(error.code === 'auth/user-not-found')
        {
          this.mostrarError('Verifique sus credenciales y vuelva a probar.');
        }
        else if(error.code === 'auth/wrong-password')
        {
          this.mostrarError('Combinación de correo y clave incorrecta.');
        }
        else if(error.code === 'auth/too-many-requests')
        {
          this.mostrarError('Demasiados intentos. Vuelva a probar en unos minutos.');
        }
        else
        {
          this.mostrarError('Ha ocurrido un error! Vuelva a probar en unos instantes.');
        }
        this.estaCargando = false
      })
  }

  ocultarError(){
    if (this.errorLogin.opacity > 0){
      setTimeout(()=>{
        this.errorLogin.opacity -= 0.01
        this.ocultarError();
      }, 10)
    }
    else {
      this.errorLogin.message = '';
    }
  }

  mostrarError(message:string){
    this.errorLogin.message = message;
    if (this.errorLogin.opacity < 1){
      setTimeout(()=>{
        this.errorLogin.opacity += 0.005
        this.mostrarError(message);
      }, 1)
    }
    else {
      setTimeout(() =>{
        this.ocultarError();
      }, 1500);
    }
  }

  onUsuarioLoginSelected(correo: string){
    this.fm['correo'].setValue(correo);
    this.fm['contrasena'].setValue('123456');
  }

}
