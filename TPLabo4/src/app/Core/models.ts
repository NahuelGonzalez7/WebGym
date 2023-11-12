
import { Iexcercise, IfavouriteExcercise, Ipersona } from "./interfaces";





export class User implements Ipersona {
  id: number | null;
  nombre: string;
  apellido: string;
  edad: number | null;
  email: string;
  password: string;  
  peso: number | null;
  altura: number | null;
  favouriteExcercise: IfavouriteExcercise[] = [];

  constructor(user?:any){

    this.id = user == undefined ? null : user.id;
    this.nombre =  user == undefined ? '' : user.nombre;
    this.apellido =  user == undefined ? '' : user.apellido;
    this.edad = user == undefined ? null : user.edad;
    this.peso = user == undefined ? null : user.peso;
    this.altura = user == undefined ? null : user.altura;
    this.email =  user == undefined ? '' : user.email;
    this.password =  user == undefined ? '' : user.password;
    this.favouriteExcercise = user == undefined ? [] : user.favouriteExcercise;
  }
}


export class FavouriteExcercise implements IfavouriteExcercise{
  id: number | null;
  excerciseID: number;
  isFavourite: boolean;

  constructor(favExcercise?:any){
    this.id = favExcercise == undefined ? null : favExcercise.id;
    this.excerciseID = favExcercise == undefined ? null : favExcercise.excerciseID;
    this.isFavourite = favExcercise == undefined ? false : favExcercise.isFavourite;
  }
}


export class Excercise implements Iexcercise {
  id: number;
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

