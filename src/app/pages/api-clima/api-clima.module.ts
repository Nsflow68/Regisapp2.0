import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApiClimaPageRoutingModule } from './api-clima-routing.module';

import { ApiClimaPage } from './api-clima.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApiClimaPageRoutingModule
  ],
  declarations: [ApiClimaPage]
})
export class ApiClimaPageModule {}
