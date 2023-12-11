import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AsignaturasService } from 'src/app/services/asignaturas.service';
import { FirebaseService } from 'src/app/services/firebase-service.service';

interface Asignatura {
  codigo: string;
  nombre: string;
  rut_docente: string;
}

@Component({
  selector: 'app-asignatura-crud',
  templateUrl: './asignatura-crud.page.html',
  styleUrls: ['./asignatura-crud.page.scss'],
})

export class AsignaturaCrudPage implements OnInit {



  //Variables auxiliares
  codigo : string = "";
  nombre : string = "";
  rut_docente : string = "";
  KEY : string = "asignaturas"
  id_modificar = "";

  constructor(private asignaturasService : AsignaturasService,
              private toastController : ToastController,
              private firebase: FirebaseService) { }

  async ngOnInit() {
    await this.listarAsignaturas();
  }

  asignaturita = new FormGroup({
    codigo : new FormControl('', [Validators.required]),
    nombre : new FormControl('', [Validators.required]),
    rut_docente : new FormControl('', [Validators.required])
  })

  asignaturas : any[] = [];

  //Metodos
  listarAsignaturas() {
    this.firebase.listarAsignaturas().subscribe(
      (asignaturas: Asignatura[]) => {
        this.asignaturas = asignaturas;
      },
      error => {
        console.error('Error al obtener asignaturas desde Firebase:', error);
      }
    );
  }

  async guardar() {
    const asignaturaFormValue = this.asignaturita.value as Asignatura;
  
    if (!asignaturaFormValue.codigo || !asignaturaFormValue.nombre || !asignaturaFormValue.rut_docente) {
      console.error('Valores del formulario son nulos o indefinidos');
      this.alerta('bottom', 'No se pudo registrar la Asignatura', 3000, 'danger');
      return;
    }
  
    const asignatura: Asignatura = asignaturaFormValue;
  
    try {
      await this.firebase.agregar('asignaturas', asignatura);
      this.alerta('bottom', 'Asignatura Registrada', 3000, 'success');
      await this.listarAsignaturas();
    } catch (error) {
      console.error('Error al registrar la asignatura:', error);
      this.alerta('bottom', 'No se pudo registrar la Asignatura', 3000, 'danger');
    }
  }

  modificar() {
    this.firebase.modificar('asignaturas', this.id_modificar, this.asignaturita.value);
    this.id_modificar = '';
  }

  buscar(codigo: string) {
    this.firebase.getDato('asignaturas', codigo)?.subscribe(
      (response: any) => {
        const data = response.data();
        this.asignaturita.patchValue({
          codigo: data.codigo,
          nombre: data.nombre,
          rut_docente: data.rut_docente
        });
        this.id_modificar = response.id;
      }
    );
  }

  async eliminar(codigo: string) {
    try {
      const asignaturaObservable = this.firebase.getDato('asignaturas', codigo);
  
      if (asignaturaObservable) { // Asegúrate de que no sea null
        asignaturaObservable.subscribe(
          (asignaturaSnapshot: any) => {
            const asignaturaData = asignaturaSnapshot.data();
            const id = asignaturaSnapshot.id;
      
            this.firebase.eliminar('asignaturas', id);
            this.alerta("bottom", "Asignatura eliminada!", 3000, "success");
            this.listarAsignaturas();
          },
          error => {
            console.error('Error al obtener asignatura:', error);
            this.alerta("bottom", "Error al obtener asignatura", 3000, "danger");
          }
        );
      } else {
        console.error('El observable de asignatura es nulo.');
        this.alerta("bottom", "Error al obtener asignatura", 3000, "danger");
      }
    } catch (error) {
      console.error('Error al eliminar asignatura:', error);
      this.alerta("bottom", "Error al eliminar asignatura", 3000, "danger");
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
}

