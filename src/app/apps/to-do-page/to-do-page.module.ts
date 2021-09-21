import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularMaterialModule } from 'src/shared/angular-material.module';

import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { ToDoPageRoutingModule } from './to-do-page-routing.module';
import { ToDoPageComponent } from './to-do-page.component';


@NgModule({
  declarations: [
    ToDoPageComponent,
    ToDoListComponent
  ],
  imports: [
    CommonModule,
    ToDoPageRoutingModule,
    FlexLayoutModule,
    AngularMaterialModule
  ]
})
export class ToDoPageModule { }
