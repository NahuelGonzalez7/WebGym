import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../Core/models';
import { AuthService } from '../../Core/auth.service';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {

  mostrar: boolean = false;
  
  constructor() {}

  vistaForm(){
    this.mostrar = !this.mostrar;
  } 

  
}

