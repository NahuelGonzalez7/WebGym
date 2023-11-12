import { Component, EventEmitter, Output, OnInit} from '@angular/core';
import { User } from '../Core/models';
/*import { ApiService } from '../Core/api.service';*/
import { ValidationsService } from '../Core/validations.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent{

  constructor(private validationService: ValidationsService, private fb: FormBuilder){};

  public newUser: User = new User();

  @Output() public userToCreate: EventEmitter<User> = new EventEmitter();
  
  private emailPattern: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  loginForm: FormGroup = this.fb.group({
    nombre: new FormControl(" ", [Validators.required, Validators.maxLength(10)]),
    apellido: new FormControl(" ", [Validators.required, Validators.maxLength(10)]),
    edad: new FormControl(" ", [Validators.required, Validators.maxLength(3)]),
    peso: new FormControl(" ", [Validators.required, Validators.maxLength(3)]),
    altura: new FormControl(" ", [Validators.required, Validators.maxLength(3)]),
    email: new FormControl(" ",[Validators.required, Validators.pattern(this.emailPattern)]),
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

}
