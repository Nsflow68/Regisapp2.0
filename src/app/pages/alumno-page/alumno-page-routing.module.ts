import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlumnoPagePage } from './alumno-page.page';

const routes: Routes = [
  {
    path: '',
    component: AlumnoPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlumnoPagePageRoutingModule {}
