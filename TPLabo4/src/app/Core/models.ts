import { Iuser } from "./interfaces";
import { Iejercicios } from "./interfaces";

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

export class Ejercicios implements Iejercicios{

  nombre: string;
  tipo: string;
  descripcion: string;
  duracion: number;
 

  constructor(ejercicios?:any){

    this.nombre =  ejercicios == undefined ? '' : ejercicios.nombre;
    this.tipo =  ejercicios == undefined ? '' : ejercicios.tipo;
    this.descripcion =  ejercicios == undefined ? '' : ejercicios.descripcion;   
    this.duracion = ejercicios == undefined ? null : ejercicios.duracion;

  }
}
