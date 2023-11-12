import { Component, EventEmitter, Output, OnInit} from '@angular/core';
import { User } from '../Core/models';
import { ApiService } from '../Core/api.service';
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
  
  /*private email: string = " ";*/
  private emailPattern: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  loginForm: FormGroup = this.fb.group({
    nombre: new FormControl(" ", [Validators.required, Validators.maxLength(50)]),
    apellido: new FormControl(" ", [Validators.required, Validators.maxLength(50)]),
    edad: new FormControl(" ", [Validators.required]),
    peso: new FormControl(" ", [Validators.required]),
    altura: new FormControl(" ", [Validators.required]),
    email: new FormControl(" ",[Validators.required, Validators.pattern(this.emailPattern)]),
    password: new FormControl(" ", [Validators.required, Validators.minLength(7)])

  })

  public isValidField(field: string): boolean | null {

    return this.validationService.isValidForm(field,this.loginForm);
  }


  public getFieldError(field: string): string | null{

    return this.validationService.getFormError(field,this.loginForm);
  }


  public createUser(){
  
    this.userToCreate.emit(this.newUser);
    
  }

}
