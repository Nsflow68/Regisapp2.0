import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsignaturaCrudPageRoutingModule } from './asignatura-crud-routing.module';

import { AsignaturaCrudPage } from './asignatura-crud.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsignaturaCrudPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AsignaturaCrudPage]
})
export class AsignaturaCrudPageModule {}
