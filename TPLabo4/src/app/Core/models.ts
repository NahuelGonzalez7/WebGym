import { Edays, Iexcercise, Iroutine as Iroutine, Ipersona } from "./interfaces";


export class User implements Ipersona {
  id: number | null;
  nombre: string;
  apellido: string;
  edad: number | null;
  email: string;
  password: string;
  
  peso: number | null;
  altura: number | null;

  constructor(user?:any){

    this.id = user == undefined ? null : user.id;
    this.nombre =  user == undefined ? '' : user.nombre;
    this.apellido =  user == undefined ? '' : user.apellido;
    this.edad = user == undefined ? null : user.edad;
    this.peso = user == undefined ? null : user.peso;
    this.altura = user == undefined ? null : user.altura;
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
  imageURL: string;

  constructor(excercise?:any){
    this.id = excercise == undefined ? null : excercise.id;
    this.excercise = excercise == undefined ? '' : excercise.excercise;
    this.description = excercise == undefined ? '' : excercise.description;
    this.repetitions = excercise == undefined ? null : excercise.repetitions;
    this.series = excercise == undefined ? null : excercise.series;
    this.excerciseType = excercise == undefined ? null : excercise.excerciseType;
    this.imageURL = excercise == undefined ? null : excercise.imageURL;
    
  }
}

