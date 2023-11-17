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

  /**
 * @method isValidfield: Checks the validity of a form field using the validation service. 
 * @param field - The name of the form field to be checked for validity.
 * @returns A boolean indicating whether the specified form field is valid (true), invalid (false), or the validity is not determined (null).
 * */

public isValidField(field: string): boolean | null{

 return this.validationService.isValidForm(field,this.loginForm);
}

/**
 * @method getFieldError: Retrieves the error message associated with a specific form field from the validation service.
 * @param field - The name of the form field for which to retrieve the error message.
 * @returns The error message for the specified form field, or null if no error is found.
 * */

public getFieldError(field: string): string | null{
 
 return this.validationService.getFormError(field,this.loginForm);
}


/**
 * @method checkAuth: Checks the authentication status of a user and performs appropriate actions based on the result.
 * This function logs a message to the console, checks the authentication status using the `authService`,
 * and navigates to the home page if authentication is successful. If authentication fails, it displays
 * an error message using the SweetAlert2 library.
 * @throws Error - If an error occurs during the authentication check.
 */

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

/**
 * @method navigateToRegister: Navigates to the registration page.
 * This function uses the Angular Router to navigate to the registration page, typically triggered
 * when a user wants to move from the current page to the registration page.
 */

  public navigateToRegister(){
    this.router.navigate(['/register']);
  }

}
