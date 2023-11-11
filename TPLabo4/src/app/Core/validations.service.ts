import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {
  

  constructor() { }
  
  public isValidForm(field: string, FormGroup: FormGroup): boolean | null{
    return FormGroup.controls[field].errors && FormGroup.controls[field].touched;}

  public getFormError(field: string, FormGroup: FormGroup): string | null{  

    if(!FormGroup.controls[field]) return null;
  
    const errors = FormGroup.controls[field].errors || {};
  
    for(const key of Object.keys(errors)) {
  
      switch(key) {
        case 'required':
          return "Este campo es requerido";
  
          case 'minLength':
            return `Mínimo ${errors['minLenght'].requiredLength} caracteres.`;
      }
    }
 return null;
  }
  
}
