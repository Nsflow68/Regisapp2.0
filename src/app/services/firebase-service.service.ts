import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private fire: AngularFirestore) { }

  //crud:
  agregar(coleccion: string, value:any){
    try {
      console.log('Agregando a', coleccion, 'con datos:', value);
      this.fire.collection(coleccion).add(value);
    } catch (error) {
      console.error('Error al agregar datos:', error);
    }
  }

  getDatos(coleccion: string){
    try {
      return this.fire.collection(coleccion).snapshotChanges();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  eliminar(coleccion: string, id: any){
    try {
      this.fire.collection(coleccion).doc(id).delete();
    } catch (error) {
      console.log(error);
    }
  }

  getDato(coleccion: string, id: string){
    return this.fire.collection(coleccion).doc(id).get();
  }

  modificar(coleccion: string, id: string, value: any){
    try {
      this.fire.collection(coleccion).doc(id).set(value);
    } catch (error) {
      console.error(error);
    }
  }

  listarUsuarios(): Observable<any[]> {
    return this.fire.collection('usuarios').valueChanges();
  }

  listarAsignaturas(): Observable<any[]>{
    return this.fire.collection('asignaturas').valueChanges();
  }

  getCollection(collectionName: string) {
    return this.fire.collection(collectionName);
  }
  //Login Fire




}
