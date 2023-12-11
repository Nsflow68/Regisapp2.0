import { Component, OnInit } from '@angular/core';
import { AsignaturasService } from 'src/app/services/asignaturas.service';

@Component({
  selector: 'app-docente-page',
  templateUrl: './docente-page.page.html',
  styleUrls: ['./docente-page.page.scss'],
})
export class DocentePagePage implements OnInit {

  KEY : string = "asignaturas"
  asignaturas: any[] = [];

  constructor(private asignaturasService : AsignaturasService) { }

  async ngOnInit() {
    await this.listar();
  }


  async listar(){
    this.asignaturas = await this.asignaturasService.listar(this.KEY);
  }
}
