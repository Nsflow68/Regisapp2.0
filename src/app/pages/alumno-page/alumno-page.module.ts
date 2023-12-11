import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlumnoPagePageRoutingModule } from './alumno-page-routing.module';

import { AlumnoPagePage } from './alumno-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlumnoPagePageRoutingModule
  ],
  declarations: [AlumnoPagePage]
})
export class AlumnoPagePageModule {}
