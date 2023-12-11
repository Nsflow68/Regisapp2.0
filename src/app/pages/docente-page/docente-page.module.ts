import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocentePagePageRoutingModule } from './docente-page-routing.module';

import { DocentePagePage } from './docente-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocentePagePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DocentePagePage]
})
export class DocentePagePageModule {}
