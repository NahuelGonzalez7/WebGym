import { ThisReceiver } from '@angular/compiler';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { ApiService } from 'src/app/Core/api.service';
import { ExerciseService } from 'src/app/Core/exercise.service';
import { Excercise, FavouriteExercise, User } from 'src/app/Core/models';

@Component({
  selector: 'app-view-ejercicios',
  templateUrl: './view-ejercicios.component.html',
  styleUrls: ['./view-ejercicios.component.css']
})
export class ViewEjerciciosComponent implements OnInit, AfterViewInit{

  public dayOftheweek: string  = "martes";
  @ViewChild('heartButton') heartButton !:ElementRef<HTMLElement>;

  public favouriteExercises: FavouriteExercise[] = [];
  public excercises: Excercise[] = [];
  public user : User = new User(); 

  constructor(private apiService: ApiService, private exerciseService: ExerciseService) {
    
  }

  ngOnInit(): void {
    
    // this.getRoutines();
    // this.getRoutineByDay(this.dayOftheweek);
    this.getExcercises();
    // this.apiService.isExcerciseFavourite(1).subscribe(resp => {console.log(resp)});
    this.getFavouriteExcercisesByUser(1);
    // this.apiService.removeFavouriteExcercise(this.routines,1,1).subscribe(resp => {console.log(resp)});
    // this.removeFavouriteExcercise(1,3);
    // this.apiService.addExerciseToFavourite(1,4).subscribe(resp=> {});
  }

  ngAfterViewInit(): void {
    this.onLikeClick();
  }

  getRoutines(){
    this.apiService.getRoutines().subscribe(resp => {
      // this.routines = resp;
      // console.log(resp.map((data => {data.description})));
      console.log(resp[0]);
    });
  }

  getRoutineByDay(dayOftheweek: string) {
    this.apiService.getRoutinesByDay(dayOftheweek).subscribe( resp => {
      this.favouriteExercises = resp;
      console.log(resp);
      console.log(this.favouriteExercises);
    });
  }

  /** Fetches exercises from the API.
 *
 */
  getExcercises() {
    this.exerciseService.getExercises().subscribe (resp => {
      console.table(resp);
      this.excercises = resp;
    });
  }

  /** Fetches exercises for a specific day of the week from the API.
 *
 * @param dayOfTheWeek - The day of the week for which exercises are requested.
 */
  getExcercisesByDay(dayOftheweek: string) {
    this.exerciseService.getExercisesByType(dayOftheweek).subscribe (resp => {
      this.excercises = resp;
      console.log("estoy aca",this.excercises);
    });
  }

  addExcerciseToFavourite(userID:number,exerciseID: number){
    this.exerciseService.addExerciseToFavourite(userID,exerciseID).subscribe(resp => {
      console.log(resp);
    });
  }

    //ToDo PROBAR
    removeFavouriteExcercise(userID:number,excerciseID:number){
      this.exerciseService.removeFavouriteExercise(userID,excerciseID).subscribe(resp => { 
        //ToDo agregar sweet alert indicando que se borro bien
        console.log(resp) 
      });
  }

  //ToDo PROBAR
  getFavouriteExcercisesByUser(userID:number){
    this.exerciseService.getFavouriteExercisesByUser(userID).subscribe(resp=>{
      this.favouriteExercises = resp;
      console.log(this.favouriteExercises);
      // console.log("favourite excercises",resp)
    });
  }

  onLikeClick() {
    // TODO: Implement like button functionality here
    // console.log(this.heartButton);
    if(this.heartButton)
      this.heartButton.nativeElement.classList.add('clicked');
  }

}
