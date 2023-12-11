import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-api-clima',
  templateUrl: './api-clima.page.html',
  styleUrls: ['./api-clima.page.scss'],
})

export class ApiClimaPage {
  apiKey = 'f1233984f682f7276df87718e3cc3e57'; // Tu clave de acceso
  apiUrl = 'http://api.weatherstack.com/current';
  ciudad: string = ''; // Variable para almacenar la ciudad ingresada por el usuario
  climaData: any; // Variable para almacenar los datos del clima

  constructor(private http: HttpClient, private usuarioStorage: StorageService,
    private router : Router) {}

    consultarClima(ciudad: string) {
      const params = {
        access_key: this.apiKey,
        query: ciudad,
      };
  
      return this.http.get(this.apiUrl, { params });
    }

  consultarClimaSantiago() {
    const apiUrl = 'http://api.weatherstack.com/current?access_key=${this.apiKey}&query=${this.ciudad}';

    this.http.get(apiUrl).subscribe(
      (response) => {
        this.climaData = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
