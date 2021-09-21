import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToDoPageRoutingModule } from './to-do-page-routing.module';
import { ToDoPageComponent } from './to-do-page.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';


@NgModule({
  declarations: [
    ToDoPageComponent,
    ToDoListComponent
  ],
  imports: [
    CommonModule,
    ToDoPageRoutingModule
  ]
})
export class ToDoPageModule { }
