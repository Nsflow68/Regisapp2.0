import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {

  constructor(private router : Router, private usuStorage:StorageService,) { }

  usuario : any;

  ngOnInit() {
    this.usuario = this.router.getCurrentNavigation()?.extras.state;
    this.usuario = this.usuario.user;
  }

  salir(){
    this.usuStorage.logout();
  }
}
