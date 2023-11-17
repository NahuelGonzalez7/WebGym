import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from 'src/app/Core/api.service';
import { ExerciseService } from 'src/app/Core/exercise.service';
import { Exercise, FavouriteExercise, User,Routine } from 'src/app/Core/models';
import { UserService } from 'src/app/Core/user.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-view-ejercicios',
  templateUrl: './view-ejercicios.component.html',
  styleUrls: ['./view-ejercicios.component.css'],
})
export class ViewEjerciciosComponent implements OnInit, AfterViewInit {
  public dayOftheweek: string = 'martes';
  @ViewChild('heartButton') heartButton!: ElementRef<HTMLElement>;

  public favouriteExercises: FavouriteExercise[] = [];
  public favouriteExercisesIDS: number[] = [];
  public excercises: Exercise[] = [];
  public user: User = new User();

  constructor(
    private apiService: ApiService,
    private exerciseService: ExerciseService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    console.log("hola webon");
    this.getLocalStorageUser();
    // this.getUserByID(1);
    // this.getRoutines();
    // this.getRoutineByDay(this.dayOftheweek);
    // this.getLoggedUser();
    this.exerciseService.getFavouriteExercisesByUser(this.user.id).subscribe(resp => {
      this.favouriteExercisesIDS = resp.map(x => 
         x.exerciseID        
       );
       this.getExcercises();
    })
    // this.getExcercises();

    this.getLocalStorageUser();

    // const storedUser = localStorage.getItem('user');
    // if (storedUser) {
    //   const arrayFromLocalStorage = JSON.parse(storedUser);
    //   console.log(arrayFromLocalStorage);
    //   const myUser = arrayFromLocalStorage[0];
    //   this.user = myUser;
    // } else {
    //   console.warn('User not found in local storage');
    // }


    // (async () => {
    //   this.user = await this.getLoggedUser();
    //   // this.getExcercises();
    // })();


    // console.log(this.activatedRoute.snapshot.data['user']);
    // this.user = this.user = this.activatedRoute.snapshot.data['user'];
    // // Check if the user is logged in
    // if (this.activatedRoute.snapshot.queryParams['isLoggedIn'] === 'true') {
    //   // Get the user ID from the router state
    //   const userId = this.activatedRoute.snapshot.data['user'];
    //   console.log(userId);
    //   // Get the user object from the database
    //   this.apiService.getUserById(userId).subscribe((user) => {
    //     this.user = user;
    //   });
    // } else {
    //   // The user is not logged in
    //   console.log('se volvio a romper no existe el user');
    // }
    
    console.log(this.user);

    // this.apiService.isExcerciseFavourite(1).subscribe(resp => {console.log(resp)});
    // this.getFavouriteExcercisesByUser(this.user.id);
    // this.apiService.removeFavouriteExcercise(this.routines,1,1).subscribe(resp => {console.log(resp)});
    // this.removeFavouriteExcercise(1,3);
    // this.apiService.addExerciseToFavourite(1,4).subscribe(resp=> {});
  }

  private getLocalStorageUser() {
    const storedUser = localStorage.getItem('user');
    console.log(storedUser);
    const arrayFromLocalStorage = storedUser ? JSON.parse(storedUser) : null;
    // this.user = storedUser ? JSON.parse(storedUser) : null;
    const myUser = arrayFromLocalStorage[0];
    this.user = myUser;
  }

  ngAfterViewInit(): void {
    // this.onLikeClick();
  }
 

  // getLoggedUser(): User {
  //   this.userService.currentUser.subscribe((currentUser) => {
  //     this.apiService
  //       .getUserLogged(currentUser.email, currentUser.password)
  //       .subscribe((userLogged) => {
  //         console.log(userLogged);
  //         this.user = userLogged;
  //       });
  //   });
  //   console.log("el usuario adentro del metodo pero afuera del service",this.user);
  //   return this.user;
  // }

  getRoutines() {
    this.apiService.getRoutines().subscribe((resp) => {
      // this.routines = resp;
      // console.log(resp.map((data => {data.description})));
      // console.log(resp[0]);
    });
  }

  getRoutineByDay(dayOftheweek: string) {
    this.apiService.getRoutinesByDay(dayOftheweek).subscribe((resp) => {
      this.favouriteExercises = resp;
      // console.log(resp);
      // console.log(this.favouriteExercises);
    });
  }

  /** Fetches exercises from the API.
   *
   */
  getExcercises() {
    this.exerciseService.getExercises().subscribe((resp) => {
      this.excercises = resp;
      console.table(this.excercises);
    });
  }

  /** Fetches exercises for a specific day of the week from the API.
   *
   * @param dayOfTheWeek - The day of the week for which exercises are requested.
   */
  getExcercisesByDay(dayOftheweek: string) {
    this.exerciseService.getExercisesByType(dayOftheweek).subscribe((resp) => {
      this.excercises = resp;
      // console.log("estoy aca",this.excercises);
    });
  }

  addExcerciseToFavourite(userID: number | null, exerciseID: number) {
    if (userID == null) {
      alert('No hay un usuario registrado');
    } else if (exerciseID == null) {
      alert('No tenes ejercicios favoritos');
    } else {
      this.exerciseService
        .addExerciseToFavourite(userID, exerciseID)
        .subscribe((resp) => {
          console.log(resp);
        });
    }
  }

  //ToDo PROBAR
  removeFavouriteExcercise(userID: number, excerciseID: number) {
    this.exerciseService
      .removeFavouriteExercise(userID, excerciseID)
      .subscribe((resp) => {
        //ToDo agregar sweet alert indicando que se borro bien
        // console.log(resp)
      });
  }

  //ToDo PROBAR
  getFavouriteExcercisesByUser(userID: number) {
    this.exerciseService
      .getFavouriteExercisesByUser(userID)
      .subscribe((resp) => {
        this.favouriteExercises = resp;
        // console.log(this.favouriteExercises);
        console.log("favourite excercises",resp)
      });
  }

  getUserByID(userID: number) {
    this.apiService.getUserById(userID).subscribe((user) => {
      // console.log(user);
      this.user = user;
    });
  }

  isFavourite(exerciseID: number){
    console.log(this.favouriteExercisesIDS.some(x => x == exerciseID));
    return this.favouriteExercisesIDS.some(x => x == exerciseID);

  }

  onLikeClick() {
    // TODO: Implement like button functionality here
    // console.log(this.heartButton);
    if (this.heartButton)
      this.heartButton.nativeElement.classList.add('clicked');
  }
}
