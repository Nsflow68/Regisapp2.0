import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AsignaturasService {

  asignaturas : any[] = [];
  KEY: string = "asignaturas"

  constructor(private storage : Storage) {
    storage.create()
  }

  //Metodos

  //Buscar
  async buscar(codigo: string, key: string): Promise<any>{
    this.asignaturas = await this.storage.get(key) || [];
    return this.asignaturas.find(asignatura => asignatura.codigo == codigo);
  }

  async agregar(asignatura: any,codigo:string , key: string): Promise<boolean>{
    this.asignaturas = await this.storage.get(key) || "";
    let asignatura_encontrada = await this.buscar(codigo, key)
    if(asignatura_encontrada == undefined){
      this.asignaturas.push(asignatura);
      await this.storage.set(key, this.asignaturas);
      return true;
    }
    return false;
  }

  async modificar(asignatura: any, key: string): Promise<boolean>{
    this.asignaturas = await this.storage.get(key) || [];
    let index = this.asignaturas.findIndex(asign => asign.codigo == asignatura.codigo);
    if(index == -1){
      return false;
    }
    this.asignaturas[index] = asignatura;
    await this.storage.set(key, this.asignaturas);
    return true;
  }

  //Eliminar
  async eliminar(codigo: string, key: string): Promise<boolean> {
    var resp: boolean = false;
    this.asignaturas = await this.storage.get(key) || [];
    this.asignaturas.forEach((asignatura, index) => {
      if (asignatura.codigo === codigo) {
        this.asignaturas.splice(index, 1);
        resp = true;
      }
    });
    await this.storage.set(key, this.asignaturas);
    return resp;
  }

  //Listar
  async listar(key: string): Promise<any[]>{
    this.asignaturas = await this.storage.get(key) || [];
    return this.asignaturas;
  }
}
