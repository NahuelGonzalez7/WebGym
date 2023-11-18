import { Component, EventEmitter, Output, OnInit} from '@angular/core';
import { User } from '../Core/models';
import { ApiService } from '../Core/api.service';
import { ValidationsService } from '../Core/validations.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { validator } from '../Core/validators';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent{

  constructor(private validationService: ValidationsService, private fb: FormBuilder, private apiService: ApiService){
/* 
    this.apiService.duplicateEmail("m@gmail.com").subscribe(answer => {console.log(answer)});
    this.validationService.checkDuplicate("milagros@gmail.com").then(answer => {console.log(answer)});*/
  };

  public newUser: User = new User();
  public mostrar: boolean = false;

  @Output() public userToCreate: EventEmitter<User> = new EventEmitter();
  
  private emailPattern: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  /*private checkDuplicate2: Promise<boolean> = this.validationService.checkDuplicate(this.newUser.email);*/

  loginForm: FormGroup = this.fb.group({
    nombre: new FormControl(" ", [Validators.required, Validators.maxLength(10)]),
    apellido: new FormControl(" ", [Validators.required, Validators.maxLength(10)]),
    edad: new FormControl(" ", [Validators.required, Validators.maxLength(3)]),
    peso: new FormControl(" ", [Validators.required, Validators.maxLength(3)]),
    altura: new FormControl(" ", [Validators.required, Validators.maxLength(3)]),
    email: new FormControl(" ",[Validators.required, Validators.pattern(this.emailPattern)/*,validator(this.validationService)*/]),
    password: new FormControl(" ", [Validators.required, Validators.minLength(5)])

  })


/**
 * @method isValidField: Checks the validity of a specified field in the login form.
 *
 * @param {string} field - The name of the field to be validated.
 * @returns {boolean | null} - Returns `true` if the field is valid, `false` if invalid,
 *                             or `null` if the field is not found in the login form.
 */

  public isValidField(field: string): boolean | null {

    return this.validationService.isValidForm(field,this.loginForm);
  }

/**
 * @method getFieldError: Retrieves the error associated with a specified field in the login form.
 *
 * @param {string} field - The name of the field for which to retrieve the error.
 * @returns {string | null} - Returns the error message if the field has an error,
 *                            or `null` if the field is error-free or not found in the login form.
 */

  public getFieldError(field: string): string | null{

    return this.validationService.getFormError(field,this.loginForm);
  }

  /**
 * @method createUser: Emits an event to create a new user with the provided user data.
 *
 * This method triggers the 'userToCreate' event, indicating that a new user
 * should be created with the data stored in the 'newUser' property.
 * The event can be subscribed to by other components or services to handle
 * the creation of a new user.
 */

  public createUser(){
  
    this.userToCreate.emit(this.newUser);    
  }

    
/**
 * @method checkDuplicate: Checks for duplicate user emails using the validation service.
 * 
 * @param user - The user object containing the email to be checked for duplication.
 * @returns A boolean indicating whether the email is unique (true) or a duplicate (false).
 * @throws Error - If an error occurs during the email duplication check.
 */


 public async checkDuplicate(user: User){

  let error: boolean = true;
  const check = this.validationService.checkDuplicate(user.email);
  
  if(await check){
    
  }
  else{
    error = false;
  }

  return error;

}

/**
 * @method isEmailDuplicate: Checks if the given email is a duplicate by querying the API service.
 * 
 * @param email - The email address to be checked for duplication.
 * @returns A promise that resolves to a boolean indicating whether the email is a duplicate (true) or not (false).
 * @throws Error - If an error occurs during the email duplication check.
 */

public async isEmailDuplicate(email:string): Promise<boolean>{

  let users: User[] = [];

  try{

    let apiResponse =  this.apiService.duplicateEmail(email);

    users = await lastValueFrom(apiResponse);

  }catch(error){
    console.log(error);
  }

  return users.length == 1;

}

/**
 * @method checkDuplicateEmail: Checks if the email of the new user is a duplicate and displays an error message if so.
 * @remarks
 * This function logs a message to the console and uses a notification library (SweetAlert2) to display an error
 * message if the provided email for the new user is already registered.
 * 
 * @throws Error - If an error occurs during the email duplication check.
 */

public async checkDuplicateEmail(){
  console.log("Hola entre");
  const check = this.isEmailDuplicate(this.newUser.email);
  
  if(await check){

   Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "El email ingresado ya se encuentra registrado"
    });
  /*this.getFieldError("emailInvalid");*/
  }
  else{    
   console.log("Email valido");
 
  }
} 


}
