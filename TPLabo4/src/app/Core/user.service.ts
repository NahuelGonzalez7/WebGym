import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // constructor(private apiService: ApiService) {}

  // private userSource = new BehaviorSubject<any>(null);
  // currentUser = this.userSource.asObservable();

  // setUser(user: User) {
  //   this.apiService.getUserLogged(user.email,user.password).subscribe(userLogged => {
  //     console.log(userLogged);
  //     user = userLogged;
  //     console.log(user);
  //     this.userSource.next(user);
  //   })
  // }

  // private user: User | null = null;

  // setUser(user: User) {
  //   this.user = user;
  //   console.log(user);
  //   console.log( this.user);
  //   this.localStorage.setItem('user', JSON.stringify(user));
  //   console.log(this.localStorage);
  // }

  // getUser(): User | null {
  //   return this.user;
  // }

  // constructor(private localStorage: Storage) {}
}
