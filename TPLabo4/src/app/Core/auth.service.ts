import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from './models';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService) { }

  //Puede retornar boolean solo
  public async checkAuth(email:string, password: string): Promise<boolean>{

    let users: User[] = [];

    try{

      let apiResponse =  this.apiService.getUserToAuth(email,password);


      //ToDo revisar
      users = await lastValueFrom(apiResponse);
      console.log(users);

    }catch(error){
      console.log(error);
    }

    return users.length == 1;
  }

}
