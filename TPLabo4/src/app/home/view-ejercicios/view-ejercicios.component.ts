import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { ApiService } from 'src/app/Core/api.service';
import { Excercise, FavouriteExcercise } from 'src/app/Core/models';

@Component({
  selector: 'app-view-ejercicios',
  templateUrl: './view-ejercicios.component.html',
  styleUrls: ['./view-ejercicios.component.css']
})
export class ViewEjerciciosComponent implements OnInit, AfterViewInit{

  public dayOftheweek: string  = "martes";
  @ViewChild('heartButton') heartButton !:ElementRef<HTMLElement>;

  public routines: FavouriteExcercise[] = [];
  public excercises: Excercise[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // this.getRoutines();
    this.getRoutineByDay(this.dayOftheweek);
    this.getExcercises();
    this.apiService.isExcerciseFavourite(1).subscribe(resp => {console.log(resp)});
    this.apiService.getFavouriteExcercises().subscribe(resp=>{console.log("favourite excercises",resp)});
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
      this.routines = resp;
      console.log(resp);
      console.log(this.routines);
    });
  }

  /**
 * Fetches exercises from the API.
 *
 */
  getExcercises() {
    this.apiService.getExcercises().subscribe (resp => {
      console.table(resp);
      this.excercises = resp;
    });
  }

  /**
 * Fetches exercises for a specific day of the week from the API.
 *
 * @param dayOfTheWeek - The day of the week for which exercises are requested.
 */
  getExcercisesByDay(dayOftheweek: string) {
    this.apiService.getExcercisesByType(dayOftheweek).subscribe (resp => {
      this.excercises = resp;
      console.log("estoy aca",this.excercises);
    });
  }


  addExcerciseToFavourite(excerciseID: number){
    this.apiService.addExcerciseToFavourite(excerciseID).subscribe(resp => {
      console.log(resp);
    });
  }

  onLikeClick() {
    // TODO: Implement like button functionality here
    console.log(this.heartButton);
    if(this.heartButton)
      this.heartButton.nativeElement.classList.add('clicked');
  }

}
