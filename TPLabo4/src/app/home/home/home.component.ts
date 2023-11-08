import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Core/api.service';
import { Excercise, Routine } from 'src/app/Core/models';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  public dayOftheweek: string  = "martes";

  public routines: Routine[] = [];
  public excercises: Excercise[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // this.getRoutines();
    this.getRoutineByDay(this.dayOftheweek);
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
    });
  }

}
