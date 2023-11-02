import { Iuser } from "./interfaces";

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
