import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { validateRut } from '@fdograph/rut-utilities';
import * as moment from 'moment';
import { FirebaseService } from 'src/app/services/firebase-service.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.page.html',
  styleUrls: ['./registro-usuario.page.scss'],
})
export class RegistroUsuarioPage implements OnInit {

  //variable del group: 

  usuarito = new FormGroup({
    rut : new FormControl('', [Validators.required,
                              Validators.pattern('[0-9]{1,2}[0-9]{3}[0-9]{3}-[0-9kK]')]),
    nombre : new FormControl('', Validators.required),
    correo : new FormControl('', [Validators.email, 
                                  Validators.required,
                                  Validators.pattern('[a-zA-Z]+@+(duocuc.cl)')]),
    fecha_nacimiento : new FormControl('',Validators.required),
    perfil: new FormControl('',Validators.required),
    clave : new FormControl('', Validators.required),
    clave2 : new FormControl('', Validators.required),
    fire_code: new FormControl('',Validators.required)
  });

  usuarios: any[] = [];
  KEY: string = 'usuarios';


  constructor(private usuStorage:StorageService, private router : Router, private fireService: FirebaseService ) { }

  ngOnInit() {
  }

  async agregar() {
    try {
      let fechastring = this.usuarito.value.fecha_nacimiento || "";
      let fechaOk = moment(fechastring, "YYYY-MM-DD").toDate();
  
      if (this.usuStorage.validarEdadUsuario(fechaOk)) {
        if (validateRut(this.usuarito.value.rut || "")) {
          
          this.usuarito.patchValue({
            perfil: 'alumno' 
          });
  
          var resp: boolean = await this.usuStorage.agregar(this.usuarito.value, this.KEY);
          if (resp) {
            this.fireService.agregar('usuarios', this.usuarito.value);
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
    }
  }

  listar(){
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

  contraIguale(){
    let pass1 = this.usuarito.value.clave||"";
    let pass2 = this.usuarito.value.clave2||"";
    if(pass1 !== pass2 ){
      alert("Las contraseñas deben ser iguales!!")
    }else{}
      this.agregar();
    }

    
  }

