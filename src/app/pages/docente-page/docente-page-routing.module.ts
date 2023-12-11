import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocentePagePage } from './docente-page.page';

const routes: Routes = [
  {
    path: '',
    component: DocentePagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocentePagePageRoutingModule {}
