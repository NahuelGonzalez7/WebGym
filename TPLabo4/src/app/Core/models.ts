import { Ipersona } from "./interfaces";

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
