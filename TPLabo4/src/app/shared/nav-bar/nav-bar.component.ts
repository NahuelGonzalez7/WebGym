import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{

@Input() isUser : boolean = false;
  
constructor(private router : Router){}

ngOnInit(): void {
  
}

public navigateToLanding(){
  localStorage.removeItem('user');
  this.router.navigate(['//landing']);
}

}
