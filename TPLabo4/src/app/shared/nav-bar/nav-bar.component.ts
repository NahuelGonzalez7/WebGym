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
  localStorage.removeItem('user');
  this.router.navigate(['//landing']);
}

/**
 *@method aboutUS: Displays information about the Fitness Gym in a modal using the SweetAlert2 library.
 * This function creates a modal using SweetAlert2 to provide information about Fitness Gym. It includes
 * details about the gym's history, staff composition, and the balance between physical activity,
 * comfort, and social relationships.
 */

public aboutUs(){

  Swal.fire({
    title: "Nosotros",
    html: '<p Contamos class= "aboutUs-swal">Fitness Gym es un tradicional gimnasio con más de 20 años en la actividad. Nuestro Staff está compuesto por profesores de educación física, licenciados en alto rendimiento, especialistas en management de entidades deportivas y marketing deportivo. Los años de experiencia nos han llevado a desarrollar un lugar donde se equilibra la actividad física, la comodidad y las relaciones sociales.</p>',
    imageUrl: "assets/nosotros.jpg",
    imageWidth: 400,
    imageHeight: 200,
    width: 3500
  });
}

/**
 * @method services: Displays information about the services offered by Fitness Gym in a modal using the SweetAlert2 library.
 * This function creates a modal using SweetAlert2 to provide information about the various services offered by Fitness Gym.
 * It includes details about the state-of-the-art gym equipment, equipped rooms for various disciplines, and a training
 * and rehabilitation pool.
 */

public services(){

  Swal.fire({
    title: "Nuestros servicios",
    html: '<p Contamos class= "services-swal">Contamos con una amplia variedad de servicios según los gustos y necesidades de cada persona. Entre ellos podemos mencionar una sala de maquinas de ultima generacion, salones equipados para realizar disciplinas varias y tambien contamos con una pileta de entrenameinto y rehabilitación.</p>',
    imageUrl: "assets/servicios.jpg",
    imageWidth: 400,
    imageHeight: 200,
    width: 3500

  });
}

/**
 * @method contact: Displays contact information for Fitness Gym in a modal using the SweetAlert2 library.
 * This function creates a modal using SweetAlert2 to provide contact information for Fitness Gym,
 * including the telephone number and email address.
 */

public contact(){

  Swal.fire({
    title: "Contacto",
    html: '<p class= "contact-swal">Teléfono: (0223)416-7777</p>' + ' <p>E-mail: contacto@fitnessgym.com</p>',
    imageUrl: "assets/contacto.png",
    imageWidth: 400,
    imageHeight: 200,
    width: 3500,

  });
}

}
