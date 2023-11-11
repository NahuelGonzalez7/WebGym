import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from 'src/app/Core/auth.service';
import { ValidationsService } from 'src/app/Core/validations.service';
import { User } from 'src/app/Core/models';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public user: User = new User();
  /*private email: string = " ";*/

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private validationService: ValidationsService) {};
  
  private emailPattern: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  loginForm: FormGroup = this.fb.group({
    email: new FormControl(" ",[Validators.required, Validators.pattern(this.emailPattern)]),
    password: new FormControl(" ", [Validators.required, Validators.minLength(7)])

  })

public isValidField(field: string): boolean | null{

 return this.validationService.isValidForm(field,this.loginForm);
}

public getFieldError(field: string): string | null{
 
 return this.validationService.getFormError(field,this.loginForm);
}


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
/*se agrego */
  public navigateToRegister(){
    this.router.navigate(['/register']);
  }

}
