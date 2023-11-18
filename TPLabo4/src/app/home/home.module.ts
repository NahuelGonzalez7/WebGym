import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { ViewEjerciciosComponent } from './view-ejercicios/view-ejercicios.component';
import { FavouriteExercisesComponent } from './favourite-exercises/favourite-exercises.component';



@NgModule({
  declarations: [
    HomeComponent,
    ViewEjerciciosComponent,
    FavouriteExercisesComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSlideToggleModule
  ],
  exports: [
    ReactiveFormsModule,
  ]
})
export class HomeModule { }
