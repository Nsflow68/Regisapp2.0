import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  usuario: any;

  constructor(private http: HttpClient, private usuarioStorage: StorageService,
    private router : Router) {}
      
  ngOnInit(){
    this.usuario = this.router.getCurrentNavigation()?.extras.state;
    this.usuario = this.usuario.user;
  }

  logout(){
    this.usuarioStorage.logout()
  }
}
