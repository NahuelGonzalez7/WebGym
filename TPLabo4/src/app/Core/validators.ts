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

        if(isValid == null){
             return null;   
        }else{
            return {emailInvalid: true};
        }

        return isValid?null:{emailInvalid:true};
    };
}