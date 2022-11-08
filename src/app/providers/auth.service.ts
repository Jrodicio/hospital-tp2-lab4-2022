import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, User, NextOrObserver } from '@angular/fire/auth';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public userData: User | null = null;

  constructor(
    private angularFireAuth: Auth,
    private firestoreService: FirestoreService
  ) {
    this.userData = this.userDetails();
    if(this.userData){
      localStorage.setItem('user', JSON.stringify(this.userData));
      firestoreService.getDocument('users',this.userData.uid)
      .then(value => {
        localStorage.setItem('userProfile', value.get('perfil'));
      })
    }

    onAuthStateChanged(angularFireAuth, (user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        firestoreService.getDocument('users',user.uid)
        .then(value => {
          localStorage.setItem('userProfile', value.get('perfil'));
        });
      }
      else {
        localStorage.removeItem('user');
        localStorage.removeItem('userProfile');
      }
      this.userData = user;
    });
  }

  signinUser(user:{correo:string, contraseña:string}) {
    return signInWithEmailAndPassword(this.angularFireAuth, user.correo, user.contraseña);
  }

  signoutUser() {
    return signOut(this.angularFireAuth)
  }

  userDetails() {
    return this.angularFireAuth.currentUser;
  }

  actualizarPerfil(displayName:string, photoURL?: string){
    return updateProfile(this.userData!,{displayName, photoURL});
  }
}
