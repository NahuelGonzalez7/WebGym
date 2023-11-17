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

 //ToDo probar -> estaba funcionando ok
  /** Retrieves all exercises from the API.
 *
 * @returns An observable that emits an array of exercises.
 */
  getExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${environment.apiURL}/exercises`).pipe(
      map((data: any) => {
        console.log(data);
        return data;
      })
    );
  }
//ToDo probar -> estaba funcionando ok
  /** Retrieves exercises based on the specified type of exercise.
 *
 * @param typeOfExercise - The type of exercise to filter by.
 * @returns An observable that emits an array of exercises matching the specified type.
 */
  getExercisesByType(typeOfExcercise: string): Observable<Exercise[]> {
    //Si tuvieramos que usar el bucle de for declaramos este array
    //const excerciseTypeArray: Excercise[] = [];
    return this.http.get<Exercise[]>(`${environment.apiURL}/exercises`).pipe(
      map((data: any) => {
        // for(let excercise of data) {
        //   if(excercise.excerciseType == typeOfExcercise)
        //     excerciseTypeArray.push(excercise);
        // }
        // return excerciseTypeArray;

        //Esta es una manera de hacerla con filter, que es la ideal porque te ahorras lineas de codigo y hace lo mismo que arriba
        return data.filter( (excercise: Exercise) => excercise.exerciseType == typeOfExcercise );
      })
    );
  }

//#endregion


//#region favourite exercises
  //ToDo probar -> estaba funcionando ok
  getFavouriteExercisesByUser(userID: number): Observable<FavouriteExercise[]> {
    return this.http.get<FavouriteExercise[]>(`${environment.apiURL}/users/${userID}`).pipe(
      map( (data: any) => {
        return data.favouriteExercise;
      })
    );
  }

  //ToDo probar -> estaba funcionando ok
  removeFavouriteExercise(userID: number, exerciseID: number): Observable<boolean> {
    return this.http.get<User>(`${environment.apiURL}/users/${userID}`).pipe(
      switchMap(user => {
        console.log(user);
        const updatedExercises = user.favouriteExercise.filter(exercise => exercise.exerciseID !== exerciseID);
        console.log(updatedExercises);
  
        // Actualizar el objeto user con la nueva lista de ejercicios favoritos
        user.favouriteExercise = updatedExercises;
        console.log(user);
  
        // Realizar la actualización en el servidor
        return this.http.put(`${environment.apiURL}/users/${userID}`, user).pipe(
          map(() => true), // La actualización fue exitosa, devolver true
          catchError(() => of(false)) // Manejar errores y devolver false
        );
      })
    );
  }
  
  /** Checks if an exercise is marked as a favorite.
   *
   * @param excerciseID - The ID of the exercise to check.
   * @returns An observable that emits a boolean indicating whether the exercise is a favorite.
   */
  isExerciseFavourite(excerciseID: number): Observable<boolean> {
    return this.http.get<FavouriteExercise[]>(`${environment.apiURL}/favourite_excercise`).pipe(
        map((data: any) => {
          // Filtramos la respuesta del get que tiene todos los ejercicios favoritos, si coincide el id recibido por parametro con algun id
          // que ya esta en el objeto de favourite_excercise lo guardamos en una variable
          // si no encuentra nada, devuelve un array vacio, y el metodo retorna un boolean, por lo que si el array es 0, devolveria false
          // y si el array es mayor a cero, devuelve true
          const favouriteExcercise = data.filter( (favExcercise: FavouriteExercise) => favExcercise.exerciseID == excerciseID );
          return favouriteExcercise.length > 0;
        })
      );
  }

  /** Retrieves favorite exercise information by exercise ID.
   *
   * @param exerciseID - The ID of the exercise to fetch favorite information for.
   * @returns An observable that emits an array of favorite exercise objects matching the provided exercise ID.
   */
  //ToDo ver si esto lo vamos a usar o no, no lo veo muy util
  getFavouriteExerciseByExcerciseID( excerciseID: number ): Observable<FavouriteExercise> {
    return this.http.get<FavouriteExercise[]>(`${environment.apiURL}/favourite_excercise`).pipe(
        map((data: any) => {
          return data.filter( (favExcercise: FavouriteExercise) => favExcercise.exerciseID == excerciseID );
        })
      );
  }

  //ToDo PROBAR Y VER COMO HACER LOS ID ACA -> HABRIA QUE GENERAR UN ID AUTO INCREMENTAL 
  // PARA LOS FAVOURITEEXERCISE PERO POR AHI ES AL PEDO PORQUE SE PUEDE FILTRAR POR EXCERCISE ID MAS FACIL 
  addExerciseToFavourite(userID: number, exerciseID: number):Observable<boolean> {
    return this.http.get<User>(`${environment.apiURL}/users/${userID}`).pipe(
      switchMap(user => {
        console.log(user);
        console.log(exerciseID);
        let updatedExercises = new FavouriteExercise({ "exerciseID" : exerciseID, "isFavourite" : true}); 
        // user.favouriteExercise.filter(exercise => exercise.exerciseID !== exerciseID);
        console.log(updatedExercises);
  
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

  //Crear rutina -> seleccionando, ejercicios y asignandole un dia a la rutina
  // Podria tener un creador y eliminar de rutinas
  // Y tambien un filtrador de rutinas por dia
  // Un dia solo no tiene ejercicios
  getFavouriteExercisesByDay() { }

//#endregion

}
