import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  isLoggedIn() : boolean {
    return localStorage.getItem('user') !== null;
  }

}
