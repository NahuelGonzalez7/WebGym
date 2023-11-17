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


export class Exercise implements Iexercise {
  id: number;
  exercise: string;
  description: string;
  repetitions: number;
  series: number;
  exerciseType: string;
  isFavourite?: boolean;
  imageURL: string;


  constructor(exercise?:any){
    this.id = exercise == undefined ? null : exercise.id;
    this.exercise = exercise == undefined ? '' : exercise.excercise;
    this.description = exercise == undefined ? '' : exercise.description;
    this.repetitions = exercise == undefined ? null : exercise.repetitions;
    this.series = exercise == undefined ? null : exercise.series;
    this.exerciseType = exercise == undefined ? null : exercise.excerciseType;
    this.imageURL = exercise == undefined ? null : exercise.imageURL;

  }
}

