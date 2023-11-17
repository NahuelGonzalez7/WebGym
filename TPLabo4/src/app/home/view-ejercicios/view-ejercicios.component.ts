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
import { Exercise, FavouriteExercise, User } from 'src/app/Core/models';
import { UserService } from 'src/app/Core/user.service';


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
  public exercises: Exercise[] = [];
  public user: User = new User();

  constructor(
    private apiService: ApiService,
    private exerciseService: ExerciseService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getLocalStorageUser();
    // this.getUserByID(1);
    // this.getRoutines();
    // this.getRoutineByDay(this.dayOftheweek);
    // this.getLoggedUser();
    this.getFavouriteExercises();
    
    console.log(this.user);
    console.log(this.favouriteExercisesIDS);
    
    // this.apiService.isExcerciseFavourite(1).subscribe(resp => {console.log(resp)});
    // this.getFavouriteExcercisesByUser(this.user.id);
    // this.apiService.removeFavouriteExcercise(this.routines,1,1).subscribe(resp => {console.log(resp)});
    // this.removeFavouriteExcercise(1,3);
    // this.apiService.addExerciseToFavourite(1,4).subscribe(resp=> {});
  }

  private getFavouriteExercises() {
    this.exerciseService.getFavouriteExercisesByUser(this.user.id).subscribe(resp => {
      this.favouriteExercisesIDS = resp.map(x => x.exerciseID);
      this.getExcercises();
    });
  }

  private getLocalStorageUser() {
    const storedUser = localStorage.getItem('user');
    console.log(storedUser);
    const arrayFromLocalStorage = storedUser ? JSON.parse(storedUser) : null;
    // this.user = storedUser ? JSON.parse(storedUser) : null;
    const myUser = arrayFromLocalStorage[0];
    this.user = myUser;
  }

  ngAfterViewInit(): void { }

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
      this.exercises = resp;
      console.table(this.exercises);
    });
  }

  /** Fetches exercises for a specific day of the week from the API.
   *
   * @param dayOfTheWeek - The day of the week for which exercises are requested.
   */
  getExcercisesByDay(dayOftheweek: string) {
    this.exerciseService.getExercisesByType(dayOftheweek).subscribe((resp) => {
      this.exercises = resp;
      // console.log("estoy aca",this.excercises);
    });
  }

  addOrDeleteFavouriteExercise(userID: number, exerciseID: number) {
    console.log(userID);
    console.log(exerciseID);
    if (userID == null) {
      alert('No hay un usuario registrado');
    } else if (exerciseID == null) {
      alert('No se puede agregar este ejercicio a favorito');
    } else if(this.isFavourite(exerciseID)){
      // alert('Se elimino el ejercicio');
      this.removeFavouriteExcercise(userID,exerciseID);
    } else {
      this.exerciseService.addExerciseToFavourite(userID, exerciseID).subscribe((resp) => {
        // alert('Se agrego el ejercicio');
        this.getFavouriteExercises();
      });
    }
  }

  //ToDo PROBAR
  removeFavouriteExcercise(userID: number, excerciseID: number) {
    this.exerciseService.removeFavouriteExercise(userID, excerciseID).subscribe((resp) => {
        //ToDo agregar sweet alert indicando que se borro bien
        // console.log(resp)
        this.getFavouriteExercises();
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
    return this.favouriteExercisesIDS.some(exercise => exercise == exerciseID);
  }

  onLikeClick() {
    // TODO: Implement like button functionality here
    // console.log(this.heartButton);
    if (this.heartButton)
      this.heartButton.nativeElement.classList.add('clicked');
  }
}
