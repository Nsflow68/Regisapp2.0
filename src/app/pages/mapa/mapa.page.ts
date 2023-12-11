import { Component, OnInit } from '@angular/core';
import { IonSearchbar } from '@ionic/angular';
//1. debemos llamar a una variable de google, se declara e invoca:
declare var google: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit{

  //2. variables locales para controlar el mapa:
  map: any;
  marker: any;
  duoc = {lat: -33.59848827265612, lng: -70.57879205226388};
  /*
  direccionsServices = new google.maps.direccionsServices();
  direcccionsRenderer = new google.maps.direcccionsRenderer();*/

  constructor() {}

  async ngOnInit(){
    await this.cargarMapa();
    this.autocompletarInput(this.map, this.marker);
  }

  //3. métodos que trabajen el mapa:
  async cargarMapa(){
    const mapa: any = document.getElementById("map");
    this.map = new google.maps.Map(mapa,{
      center: {lat: -33.54847751830114,lng: -71.60519297185365},
      zoom: 18
    });

    this.marker = new google.maps.Marker({
      position: {lat: -33.54847751830114,lng: -71.60519297185365},
      map: this.map,
      title: 'Ubicación inicial'
    });

    /*this.direcccionsRenderer.setMap(this.map);
    var indicaciones: HTMLElement = document.getElementById('indicaciones') as HTMLElement;
    this.direcccionsRenderer.setPanel(indicaciones);*/
  }

  async autocompletarInput(mapaLocal:any, marcadorLocal: any){
    var autocomplete: any = document.getElementById("autocomplete");
    const search = new google.maps.places.Autocomplete(autocomplete);
    search.bindTo('bounds', this.map);

    //mover mapa a dirección
    search.addListener('place_changed', function(){
      var place = search.getPlace().geometry.location;
      mapaLocal.setCenter(place);
      mapaLocal.setZoom(15);
      marcadorLocal.setPosition(place);
    })
  }

  /*ruta(){
    var autocomplete: any = document.getElementById("autocomplete");
    const search = new google.maps.places.Autocomplete(autocomplete);

    var place = search.getPlace().geometry.location;

    var request = {
      origin: this.duoc,
      destination: place,
      travelMode: google.maps.TravelMode.DRIVING
    };

    /*this.direccionsServices.route(request, (respuesta, status)=>{
      this.direcccionsRenderer.setDirections(respuesta);
    });
    this.marker
  }*/
 
}
