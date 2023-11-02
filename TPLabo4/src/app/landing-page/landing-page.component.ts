import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../Core/models';
import { AuthService } from '../Core/auth.service';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit{

  mostrar: boolean = false;
  public user: User = new User();
/*
  constructor(private authService: AuthService, private router: Router) {}*/

  ngOnInit(): void {
    
  }

  vistaForm(){
    this.mostrar = !this.mostrar;
  } 

  /*
  public async checkAuth(){

    const check = this.authService.checkAuth(this.user.email, this.user.password);

    if(await check){
      this.router.navigate(['/home']);
    }
    else{
      alert("No existe el usuario");
    }
  }*/
  
}

