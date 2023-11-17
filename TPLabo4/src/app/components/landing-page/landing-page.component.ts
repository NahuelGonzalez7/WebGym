import { Component, OnInit } from '@angular/core';
/*import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../Core/models';
import { AuthService } from '../../Core/auth.service';*/


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {

  mostrar: boolean = false;
  
  constructor() {}


/**
 * @method vistaForm: Checks the validity of a specified field in the login form.
 * @returns void
 * This method is used to show or hide a form.
 */

  vistaForm(){
    this.mostrar = !this.mostrar;
  } 

  
}

