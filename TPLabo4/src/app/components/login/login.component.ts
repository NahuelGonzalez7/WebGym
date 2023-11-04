import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/auth.service';
import { User } from 'src/app/Core/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public user: User = new User();
  
  constructor(private authService: AuthService, private router: Router) {}

  public async checkAuth(){
    console.log("Hola entre");
    const check = this.authService.checkAuth(this.user.email, this.user.password);

    if(await check){
      this.router.navigate(['/home']);
    }
    else{
      alert("No existe el usuario");
    }
  }
}
