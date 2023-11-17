
import { Iexercise, IfavouriteExercise, Ipersona } from "./interfaces";





export class User implements Ipersona {
  id: number;
  nombre: string;
  apellido: string;
  edad: number | null;
  email: string;
  password: string;  
  peso: number | null;
  altura: number | null;
  favouriteExercise: IfavouriteExercise[] = [];

  constructor(user?:any){

    this.id = user == undefined ? null : user.id;
    this.nombre =  user == undefined ? '' : user.nombre;
    this.apellido =  user == undefined ? '' : user.apellido;
    this.edad = user == undefined ? null : user.edad;
    this.peso = user == undefined ? null : user.peso;
    this.altura = user == undefined ? null : user.altura;
    this.email =  user == undefined ? '' : user.email;
    this.password =  user == undefined ? '' : user.password;
    this.favouriteExercise = user == undefined ? [] : user.favouriteExcercise;
  }
}


export class FavouriteExercise implements IfavouriteExercise{
  exerciseID: number;

  constructor(favExercise?:any){
    this.exerciseID = favExercise == undefined ? null : favExercise.exerciseID;
  }
}


export class Excercise implements Iexercise {
  id: number;
  excercise: string;
  description: string;
  repetitions: number;
  series: number;
  exerciseType: string;
  isFavourite?: boolean;

  constructor(excercise?:any){
    this.id = excercise == undefined ? null : excercise.id;
    this.excercise = excercise == undefined ? '' : excercise.excercise;
    this.description = excercise == undefined ? '' : excercise.description;
    this.repetitions = excercise == undefined ? null : excercise.repetitions;
    this.series = excercise == undefined ? null : excercise.series;
    this.exerciseType = excercise == undefined ? null : excercise.excerciseType;
  }
}

