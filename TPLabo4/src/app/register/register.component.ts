import { Component, OnInit } from '@angular/core';
import { User } from '../Core/models';
import { ApiService } from '../Core/api.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

 constructor(private apiService: ApiService, private router: Router/*, private dialog: MatDialog*/) { }

  public users: Array<User> = [];

  ngOnInit(): void {

    this.getUsers();

  }
  public async getUsers() {

    try {

      let responseApi = this.apiService.getUsers();

      const data = await lastValueFrom(responseApi);

      this.users = data.map((userData: any) => new User(userData));

    } catch (error) {
      console.error(error);
    }
  }

  public createUser(user: User) {

    this.apiService.addUser(user).subscribe({
      next: () => {
        this.getUsers();
        alert("Usuario creado con exito");
        this.router.navigate(['/landing']);

      },
      error: () => alert("No se ha podido crear el usuario")
    })
  }

}
