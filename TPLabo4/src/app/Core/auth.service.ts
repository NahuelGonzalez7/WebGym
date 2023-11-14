import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from './models';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService) { }


  /**
   * @method checkAuth: Checks the authentication status for a user with the provided email and password. 
   * This method sends a request to the server to verify the authentication status of the user.  
   * @param {string} email - The email address of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<boolean>} A promise that resolves to true if authentication is successful, otherwise false.
   * @throws {Error} If an error occurs during the authentication process.
   */
  
  public async checkAuth(email:string, password: string): Promise<boolean>{

    let users: User[] = [];

    try{

      let apiResponse =  this.apiService.getUserToAuth(email,password);

      users = await lastValueFrom(apiResponse);

    }catch(error){
      console.log(error);
    }

    return users.length == 1;

  }



}
