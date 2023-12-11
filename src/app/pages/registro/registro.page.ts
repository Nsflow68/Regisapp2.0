import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { validateRut } from '@fdograph/rut-utilities';
import * as moment from 'moment';
import { FirebaseService } from 'src/app/services/firebase-service.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  //Creamos variables tipo Form Group con validadores
  usuario = new FormGroup({
    rut : new FormControl('', [Validators.required,
                               Validators.pattern('[0-9]{1,2}[0-9]{3}[0-9]{3}-[0-9kK]')]),
    nombre : new FormControl('', [Validators.required,
                                 Validators.minLength(3)]),
    fecha_nac : new FormControl('',Validators.required),
    correo : new FormControl('', [Validators.email, 
                                Validators.required,
                                Validators.pattern('[a-zA-Z]+@+(duocuc.cl||duoc.cl||profesor.duoc.cl)')]),
    clave : new FormControl('', [Validators.required,
                                  Validators.minLength(6),
                                  Validators.maxLength(20),
                                  ]),
    clave2 : new FormControl('', [Validators.required,
                                    Validators.minLength(6),
                                    Validators.maxLength(20),
                                    ]),
    perfil : new FormControl(''),
    codigo_firebase: new FormControl('',)
    
  });

  usuarios: any[] = [];
  id_modificar: any = '';
  KEY: string = 'usuarios'
  boton_registrar: boolean = false;
  boton_modificar: boolean = true;


  constructor(private usuStorage: StorageService, private router : Router, private fireService: FirebaseService) { }

  ngOnInit() {
     this.listar(); 
  }

  listar() {
    this.fireService.getCollection('usuarios').valueChanges().subscribe(
      (data: any) => {
        this.usuarios = data;
      },
      (error: any) => {
        console.error('Error al obtener datos:', error);
      }
    );
  }


  async registrar() {
    try {
      let fechastring = this.usuario.value.fecha_nac || "";
      let fechaOk = moment(fechastring, "YYYY-MM-DD").toDate();
  
      if (this.usuStorage.validarEdadUsuario(fechaOk)) {
        if (validateRut(this.usuario.value.rut || "")) {
          var resp: boolean = await this.usuStorage.agregar(this.usuario.value, this.KEY);
  
          if (resp) {
            const usuarioData = this.usuario.value;
            this.fireService.agregar('usuarios', usuarioData);
            alert("Usuario agregado!");
          } else {
            alert("NO SE GUARDÓ!");
          }
        } else {
          alert('Rut no válido');
        }
      } else {
        alert('Edad no válida');
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('Error al registrar usuario. Consulta la consola para obtener más detalles.');
    }
  }

  listarUsuarios(){
    this.fireService.getDatos('usuarios')?.subscribe(
      data => {
        this.usuarios = [];
        for(let usuario of data){
          console.log( usuario.payload.doc.data() );
          let usu: any = usuario.payload.doc.data();
          usu['id'] = usuario.payload.doc.id;
          this.usuarios.push( usu );
        }
      }
    );
  }

  eliminar(id: string){
    console.log(`ID antes de eliminar: ${id}`);
    this.fireService.eliminar('usuarios', id);
  }


buscar(id: string) {
  this.fireService.getDato('usuarios',id).subscribe(data=> {
    let usu: any = data.data()
    usu['id']=id;
    this.usuario.setValue(usu);
  });
}

  actualizar(){
    this.fireService.modificar('usuarios', this.id_modificar, this.usuario);
    this.id_modificar = '';
  }



public limpiar(){
  document.getElementById("rut")?.setAttribute("disabled","false");
  this.boton_modificar = true;
  this.boton_registrar = false;
  }




}







