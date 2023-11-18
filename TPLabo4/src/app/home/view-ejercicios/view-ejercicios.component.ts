import { Component,OnInit } from '@angular/core';
import { ApiService } from 'src/app/Core/api.service';
import { ExerciseService } from 'src/app/Core/exercise.service';
import { Exercise, FavouriteExercise, User } from 'src/app/Core/models';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/Core/user.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-view-ejercicios',
  templateUrl: './view-ejercicios.component.html',
  styleUrls: ['./view-ejercicios.component.css'],
})
export class ViewEjerciciosComponent implements OnInit {
  public dayOftheweek: string = 'martes';


  public favouriteExercises: FavouriteExercise[] = [];
  public favouriteExercisesIDS: number[] = [];
  public exercises: Exercise[] = [];
  public user: User = new User();

  constructor(private apiService: ApiService,private exerciseService: ExerciseService) {}


  ngOnInit(): void {
    this.getLocalStorageUser();
    this.getFavouriteExercises();
  }

  private getFavouriteExercises() {
    this.exerciseService
      .getFavouriteExercisesByUser(this.user.id)
      .subscribe((resp) => {
        this.favouriteExercisesIDS = resp.map((x) => x.exerciseID);
        this.getExcercises();
      });
  }

  private getLocalStorageUser() {
    const storedUser = localStorage.getItem('user');
    const arrayFromLocalStorage = storedUser ? JSON.parse(storedUser) : null;
    const myUser = arrayFromLocalStorage[0];
    this.user = myUser;
  }

  getRoutineByDay(dayOftheweek: string) {
    this.apiService.getRoutinesByDay(dayOftheweek).subscribe((resp) => {
      this.favouriteExercises = resp;
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
    });
  }

  addOrDeleteFavouriteExercise(userID: number, exerciseID: number) {
    if (userID == null) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se encontro el usuario"
      });
    } else if (exerciseID == null) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se puede agregar el ejercicio"
      });
    } else if (this.isFavourite(exerciseID)) {
      this.removeFavouriteExercise(userID, exerciseID);
    } else {
      this.addExerciseFavouriteExercise(userID, exerciseID);
    }
  }

  private addExerciseFavouriteExercise(userID: number, exerciseID: number) {
    this.exerciseService.addExerciseToFavourite(userID, exerciseID).subscribe((resp) => {
      this.getFavouriteExercises();
    });
  }

  removeFavouriteExercise(userID: number, excerciseID: number) {
    this.exerciseService
      .removeFavouriteExercise(userID, excerciseID)
      .subscribe((resp) => {
        this.getFavouriteExercises();
      });
  }

  getFavouriteExcercisesByUser(userID: number) {
    this.exerciseService
      .getFavouriteExercisesByUser(userID)
      .subscribe((resp) => {
        this.favouriteExercises = resp;
      });
  }

  getUserByID(userID: number) {
    this.apiService.getUserById(userID).subscribe((user) => {
      this.user = user;
    });
  }

  isFavourite(exerciseID: number) {
    return this.favouriteExercisesIDS.some(
      (exercise) => exercise == exerciseID
    );
  }
}
