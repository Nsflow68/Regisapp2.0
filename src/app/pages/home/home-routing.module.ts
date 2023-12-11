import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children : [
    {
      path: 'perfil-usuario',
      loadChildren: () => import('../perfil-usuario/perfil-usuario.module').then( m => m.PerfilUsuarioPageModule)
    },
    {
      path: 'registro',
      loadChildren: () => import('../registro/registro.module').then( m => m.RegistroPageModule)
    },
    {
      path: 'docente-page',
      loadChildren: () => import('../docente-page/docente-page.module').then( m => m.DocentePagePageModule)
    },
    {
      path: 'asignatura-crud',
      loadChildren: () => import('../asignatura-crud/asignatura-crud.module').then( m => m.AsignaturaCrudPageModule)
    },
    {
      path: 'api-clima',
      loadChildren: () => import('../api-clima/api-clima.module').then( m => m.ApiClimaPageModule)
    },
    {
      path: 'alumno-page',
      loadChildren: () => import('../alumno-page/alumno-page.module').then( m => m.AlumnoPagePageModule)
    },
    {
      path: 'qr-code',
      loadChildren: () => import('../qr-code/qr-code.module').then( m => m.QrCodePageModule)
    },
    {
      path: 'mapa',
      loadChildren: () => import('../mapa/mapa.module').then( m => m.MapaPageModule)
    }
    
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    HttpClientModule // Debe estar dentro del array de imports
  ],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
