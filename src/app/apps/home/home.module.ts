import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { AngularMaterialModule } from 'src/shared/angular-material.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { UserListComponent } from './user-list/user-list.component';


@NgModule({
  declarations: [
    HomeComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    GoogleMapsModule,
    AngularMaterialModule,
    FlexLayoutModule
  ]
})
export class HomeModule { }
