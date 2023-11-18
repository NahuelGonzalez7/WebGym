import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { Exercise, FavouriteExercise, User } from './models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private http: HttpClient) {}

 //#region exercises

  /** Retrieves all exercises from the API.
 *
 * @returns An observable that emits an array of exercises.
 */
  getExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${environment.apiURL}/exercises`).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  /** Retrieves exercises based on the specified type of exercise.
 *
 * @param typeOfExercise - The type of exercise to filter by.
 * @returns An observable that emits an array of exercises matching the specified type.
 */
  getExercisesByType(typeOfExcercise: string): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${environment.apiURL}/exercises`).pipe(
      map((data: any) => {
        return data.filter( (excercise: Exercise) => excercise.exerciseType == typeOfExcercise );
      })
    );
  }

//#endregion

//#region favourite exercises
  getFavouriteExercisesByUser(userID: number): Observable<FavouriteExercise[]> {
    return this.http.get<FavouriteExercise[]>(`${environment.apiURL}/users/${userID}`).pipe(
      map( (data: any) => {
        return data.favouriteExercise;
      })
    );
  }

  removeFavouriteExercise(userID: number, exerciseID: number): Observable<boolean> {
    return this.http.get<User>(`${environment.apiURL}/users/${userID}`).pipe(
      switchMap(user => {
        const updatedExercises = user.favouriteExercise.filter(exercise => exercise.exerciseID !== exerciseID);
        
        // Actualizar el objeto user con la nueva lista de ejercicios favoritos
        user.favouriteExercise = updatedExercises;
  
        // Realizar la actualización en el servidor
        return this.http.put(`${environment.apiURL}/users/${userID}`, user).pipe(
          map(() => true), // La actualización fue exitosa, devolver true
          catchError(() => of(false)) // Manejar errores y devolver false
        );
      })
    );
  }
  
  /** Retrieves favorite exercise information by exercise ID.
   *
   * @param exerciseID - The ID of the exercise to fetch favorite information for.
   * @returns An observable that emits an array of favorite exercise objects matching the provided exercise ID.
   */
  getFavouriteExercisesByExcerciseID(userID: number): Observable<Exercise[]> {
    return this.http.get<User>(`${environment.apiURL}/users/${userID}`).pipe(
      switchMap(user => {

        const favouriteExercisesIDs = user.favouriteExercise.map(exercise => exercise.exerciseID);

        (favouriteExercisesIDs);

        return this.http.get<Exercise[]>(`${environment.apiURL}/exercises`).pipe(
          map((data: any) => {
           return data.filter( (exercise:any) => favouriteExercisesIDs.includes(exercise.id));
          }));
      })
    );
  }

  addExerciseToFavourite(userID: number, exerciseID: number):Observable<boolean> {
    return this.http.get<User>(`${environment.apiURL}/users/${userID}`).pipe(
      switchMap(user => {

        let updatedExercises = new FavouriteExercise({ "exerciseID" : exerciseID, "isFavourite" : true}); 
  
        // Actualizar el objeto user con la nueva lista de ejercicios favoritos
        user.favouriteExercise.push(updatedExercises);
  
        // Realizar la actualización en el servidor
        return this.http.put(`${environment.apiURL}/users/${userID}`, user).pipe(
          map(() => true), // La actualización fue exitosa, devolver true
          catchError(() => of(false)) // Manejar errores y devolver false
        );
      })
    );
  }

//#endregion

}
