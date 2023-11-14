import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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

/**
   * @method navigateToLanding: Navigates to the landing page.
   * This method uses the Angular Router to navigate to the landing page.
   * @returns {void}
   */

public navigateToLanding(){
  this.router.navigate(['//landing']);
}


public nosotros(){

  Swal.fire({
    title: "Nosotros",
    text: "Fitness Gym es un tradicional gimnasio con más de 20 años en la actividad. Nuestro Staff está compuesto por profesores de educación física, licenciados en alto rendimiento, especialistas en management de entidades deportivas y marketing deportivo. Los años de experiencia nos han llevado a desarrollar un lugar donde se equilibra la actividad física, la comodidad y las relaciones sociales.",
    imageUrl: "assets/nosotros.jpg",
    imageWidth: 400,
    imageHeight: 200
  });
}

public servicios(){

  Swal.fire({
    title: "Nuestros servicios",
    text: "Contamos con una amplia variedad de servicios según los gustos y necesidades de cada persona. Entre ellos podemos mencionar una sala de maquinas de ultima generacion, salones equipados para realizar disciplinas varias y tambien contamos con una pileta de entrenameinto y rehabilitación.",
    imageUrl: "assets/servicios.jpg",
    imageWidth: 400,
    imageHeight: 200
  });
}

public contacto(){

  Swal.fire({
    title: "Contacto",
    text: "Teléfono: (0223)416-7777. E-mail: contacto@fitnessgym.com.",
    imageUrl: "assets/contacto.png",
    imageWidth: 400,
    imageHeight: 200
  });
}

}
