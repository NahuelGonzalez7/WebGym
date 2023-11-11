import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { ViewEjerciciosComponent } from './view-ejercicios/view-ejercicios.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../components/login/login.component';


@NgModule({
  declarations: [
    HomeComponent,
    ViewEjerciciosComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    ReactiveFormsModule,
  ]
})
export class HomeModule { }
