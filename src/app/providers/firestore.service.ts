import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, setDoc, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) {

  }

  addDataLogTS(collectionName: string, data: any){
    const dataRef = collection(this.firestore, collectionName);
    data.ts = new Date();

    return addDoc(dataRef, JSON.parse(JSON.stringify(data)));
  }

  addData(collectionName: string, data: any){
    const dataRef = collection(this.firestore, collectionName);
    return addDoc(dataRef,data);
  }

  setDocument(collectionName: string, documentId: string, data: any){
    const docRef = doc(this.firestore, collectionName+"/"+documentId);
    return setDoc(docRef, JSON.parse(JSON.stringify(data)));
  }

  getDocuments(collectionName: string){
    const dataRef = collection(this.firestore, collectionName);
    return collectionData(dataRef, {idField: 'id'});
  }

  getDocument(collectionName: string, documentId: string){
    const docRef = doc(this.firestore, collectionName+"/"+documentId);
    return getDoc(docRef);
  }

  esAdmin(uid: string){
    return this.getDocument('administradores', uid).then((e)=>e) as Promise<boolean>;
  }
}
