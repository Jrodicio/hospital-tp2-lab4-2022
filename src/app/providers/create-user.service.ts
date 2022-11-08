import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signOut, updateProfile, User, NextOrObserver, onAuthStateChanged } from '@angular/fire/auth';
import { sendEmailVerification } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {

  public userData: User | null = null;

  constructor(
    private angularFireAuth: Auth,
  ) {
    this.userData = this.userDetails();

    onAuthStateChanged(angularFireAuth, (user) => {
      this.userData = user;
    });
  }

  userDetails() {
    return this.angularFireAuth.currentUser;
  }

  createUser(user:{correo:string, contraseña:string}) {
    return createUserWithEmailAndPassword(this.angularFireAuth, user.correo, user.contraseña);
  }

  signoutUser() {
    return signOut(this.angularFireAuth)
  }

  actualizarPerfil(displayName:string, photoURL?: string){
    return updateProfile(this.userData!,{displayName, photoURL});
  }

  enviarMailVerificacion(user: User){
    return sendEmailVerification(user);
  }
}
