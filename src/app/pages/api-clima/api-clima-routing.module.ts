import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApiClimaPage } from './api-clima.page';

const routes: Routes = [
  {
    path: '',
    component: ApiClimaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApiClimaPageRoutingModule {}
