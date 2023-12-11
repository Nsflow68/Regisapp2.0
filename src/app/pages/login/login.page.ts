import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { ToastController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // Variables para el formulario de inicio de sesión.
  correo: string = "";
  clave: string = "";

  administrador: any={
    rut: '21090419-1',
    nombre: 'nacho',
    correo: 'nacho@duocuc.cl',
    fecha_nac: '2002-08-17',
    perfil: 'admin',
    clave: 'nacho123',
    clave2: 'nacho123'
  }

  alumno: any={
    rut: '11111111-1',
    nombre: 'uno',
    correo: 'uno@duocuc.cl',
    fecha_nac: '2002-08-17',
    perfil: 'alumno',
    clave: 'asd123',
    clave2: 'asd123'
  }

  constructor(private usuStorage: StorageService, private router: Router, private toastController : ToastController, ) { }

  async ngOnInit() {
    // Puedes usar usuStorage para interactuar con el almacenamiento.
    // Ejemplo: await this.usuStorage.agregar({...}, 'usuarios');
    await this.usuStorage.agregar(this.administrador, 'usuarios')
    await this.usuStorage.agregar(this.alumno, 'usuarios')
  }

  // Método para redirigir a la página de registro.
  redireccionar() {
    this.router.navigate(['/registro']);
  }

  async ingresar() {
    // Utiliza usuStorage para buscar el usuario en el almacenamiento.
    var usuario_encontrado: any = await this.usuStorage.ingresar(this.correo, this.clave, 'usuarios');

    if(usuario_encontrado != undefined){
      var navigationExtras: NavigationExtras = {
        state: {
          user: usuario_encontrado
        }
      };
        if(usuario_encontrado.perfil == "admin"){
          this.router.navigate(['/home/perfil-usuario'], navigationExtras);
        } else if(usuario_encontrado.perfil == "docente"){
          this.router.navigate(['/home/perfil-usuario'], navigationExtras);
        } else if(usuario_encontrado.perfil == "alumno"){
          this.router.navigate(['/home/perfil-usuario'], navigationExtras);
        }

    }else{
      this.alerta('bottom','Usuario o contraseña incorrectas',3000,'danger');
    }
  }

  //Tostada
  async alerta(position: 'top' | 'middle' | 'bottom', 
  message: string,
  duration: number,
  color: 'danger'|'success'|'warning') {
  const toast = await this.toastController.create({
  message,
  duration: duration,
  position: position,
  color: color
  });

await toast.present();
}
  // Otros métodos de la página de inicio de sesión...
}
