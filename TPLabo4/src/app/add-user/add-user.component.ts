import { Component, EventEmitter, Output, OnInit} from '@angular/core';
import { User } from '../Core/models';
import { ApiService } from '../Core/api.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  public newUser: User = new User();

  @Output() public userToCreate: EventEmitter<User> = new EventEmitter();

  constructor(){};

  public createUser(){
  
    this.userToCreate.emit(this.newUser);
    
  }

}
