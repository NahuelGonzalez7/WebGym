import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from './models';
import { ApiService } from './api.service';
import { lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ValidationsService {
  

  constructor(private apiService: ApiService) { }
  
  public isValidForm(field: string, FormGroup: FormGroup): boolean | null{
    return FormGroup.controls[field].errors && FormGroup.controls[field].touched;}

  public getFormError(field: string, FormGroup: FormGroup): string | null{  

    if(!FormGroup.controls[field]) return null;
  
    const errors = FormGroup.controls[field].errors || {};
  
    for(const key of Object.keys(errors)) {
  
      switch(key) {
        
        case 'required':
          return "Este campo es requerido";
  
          case 'minlength':
            return `Mínimo ${errors['minlength'].requiredLength} caracteres.`;
            
          case 'maxlength':
          return `Máximo ${errors['maxlength'].requiredLength} caracteres.`;

          case 'pattern':
            return "Formato de correo electrónico invalido";  

          case 'emailInvalid':
            /*console.log("hola");*/
            return "El email ya se encuentra ingresado";  

      }
    }
 return null;
  }

  public async checkDuplicate(email:string): Promise<boolean>{

    let users: User[] = [];

    try{

      let apiResponse =  this.apiService.duplicateEmail(email);
      console.log(apiResponse);

      users = await lastValueFrom(apiResponse);
      console.log(users);

    }catch(error){
      console.log(error);
    }

    console.log(users.length == 1);

    return users.length == 1;
    
  }
  
}
