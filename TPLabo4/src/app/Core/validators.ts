import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { ValidationsService } from "./validations.service";

export function validator(validationService: ValidationsService): ValidatorFn {


    return (control: AbstractControl): ValidationErrors | null => {

        let isValid;
        const value = control.value;

        if (!value) {
            return null;
        }

        validationService.checkDuplicate(value).then(answer=>{isValid = answer});
       console.log(isValid == null);
        if(isValid == null){
            console.log("hola");
             return null;   
        }else{
            console.log("hola");
            return {emailInvalid: true};
        }

        return isValid?null:{emailInvalid:true};
    };
}