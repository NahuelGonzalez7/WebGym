
import { Edays, Iexcercise, Iroutine as Iroutine, Iuser } from "./interfaces";


export class User implements Iuser{
  id: number | null= null;
  email: string = '';
  password: string = '';
 

  constructor(user?:any){
    this.id = user == undefined ? null : user.id;
    this.email =  user == undefined ? '' : user.email;
    this.password =  user == undefined ? '' : user.password;
  }
}

export class Routine implements Iroutine{
  id: number | null;
  days: Edays;
 

  constructor(routine?:any){
    this.id = routine == undefined ? null : routine.id;
    this.days = routine == undefined ? [] : routine.days;
  }
}


export class Excercise implements Iexcercise {
  id: number | null;
  excercise: string;
  description: string;
  repetitions: number;
  series: number;
  excerciseType: string;

  constructor(excercise?:any){
    this.id = excercise == undefined ? null : excercise.id;
    this.excercise = excercise == undefined ? '' : excercise.excercise;
    this.description = excercise == undefined ? '' : excercise.description;
    this.repetitions = excercise == undefined ? null : excercise.repetitions;
    this.series = excercise == undefined ? null : excercise.series;
    this.excerciseType = excercise == undefined ? null : excercise.excerciseType;
  }
}

