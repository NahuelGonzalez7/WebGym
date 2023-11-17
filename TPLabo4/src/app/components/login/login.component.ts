import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Core/api.service';
import { AuthService } from 'src/app/Core/auth.service';
import { User } from 'src/app/Core/models';
import { ValidationsService } from 'src/app/Core/validations.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public user: User = new User();

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private validationService: ValidationsService, private apiService: ApiService) {};
  
  private emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  
  loginForm: FormGroup = this.fb.group({
    email: new FormControl(" ",[Validators.required, Validators.pattern(this.emailPattern)]),
    password: new FormControl(" ", [Validators.required, Validators.minLength(5)])

  })

public isValidField(field: string): boolean | null{

 return this.validationService.isValidForm(field,this.loginForm);
}

public getFieldError(field: string): string | null{
 
 return this.validationService.getFormError(field,this.loginForm);
}


 public async checkAuth(){
    const check = this.authService.checkAuth(this.user.email, this.user.password);
    
    if(await check){
      this.apiService.getUserLogged(this.user.email,this.user.password).subscribe(userToSend => {
        localStorage.setItem('user', JSON.stringify(userToSend));
        this.router.navigate(['/home']);
      });
    }
    else{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se encontro el usuario"
      });
      /*
      alert("No existe el usuario");*/
    }
  } 

  public navigateToRegister(){
    this.router.navigate(['/register']);
  }

}
