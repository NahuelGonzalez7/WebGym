import { Component, OnInit } from '@angular/core';
import { User } from '../Core/models';
import { ApiService } from '../Core/api.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private apiService: ApiService, private router: Router) {}

  public users: Array<User> = [];

  ngOnInit(): void {
    this.getUsers();
  }



  /**
   * @method getUsers: Fetches and updates the list of users from the server.
   *This method sends a request to the server to retrieve a list of users and updates the internal
   *'users' property with the received data.
   * @returns {Promise<void>} A promise that resolves when the user data has been successfully updated.
   * @throws {Error} If an error occurs during the process of fetching and updating user data.
   */

  public async getUsers() {
    try {
      let responseApi = this.apiService.getUsers();

      const data = await lastValueFrom(responseApi);

      this.users = data.map((userData: any) => new User(userData));
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @function
   * @method createUser:Creates a new user on the server and performs additional actions based on the API response.
   * This method sends a request to the server to add a new user, subscribes to the observable response,
   * and performs actions based on success or failure.
   * @param {User} user - The user object containing information for creating the new user.
   * @returns {void}
   */

  public createUser(user: User) {
    this.apiService.addUser(user).subscribe({
      next: () => {

       /* this.getUsers();*/
        /*alert('Usuario creado con exito');*/

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Usuario creado con exito",
          showConfirmButton: false,
          timer: 1000
        });
        this.router.navigate(['/landing']);
      },
      error: () => alert('No se ha podido crear el usuario'),
    });
  }

}
