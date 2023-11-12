
import { Iexcercise, IfavouriteExcercise, Iuser } from "./interfaces";


export class User implements Iuser{
  id: number | null;
  email: string = '';
  password: string = '';
  favouriteExcercise: IfavouriteExcercise[] = [];

  constructor(user?:any){
    this.id = user == undefined ? null : user.id;
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

