import { Component, OnInit } from '@angular/core';
import { ExerciseService } from 'src/app/Core/exercise.service';
import { Exercise, FavouriteExercise, User } from 'src/app/Core/models';

@Component({
  selector: 'app-favourite-exercises',
  templateUrl: './favourite-exercises.component.html',
  styleUrls: ['./favourite-exercises.component.css']
})
export class FavouriteExercisesComponent implements OnInit{

  public favouriteExercises: Exercise[] = [];
  public favouriteExercisesIDS: number[] = [];
  public exercises: Exercise[] = [];
  public user: User = new User();

  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.getLocalStorageUser();
    this.getFavouriteExercises();
  }

  private getFavouriteExercises() {
    this.exerciseService.getFavouriteExercisesByExcerciseID(this.user.id).subscribe(resp =>{
      this.favouriteExercises = resp;
    });
  }

  private getLocalStorageUser() {
    const storedUser = localStorage.getItem('user');
    const arrayFromLocalStorage = storedUser ? JSON.parse(storedUser) : null;
    const myUser = arrayFromLocalStorage[0];
    this.user = myUser;
  }

}
