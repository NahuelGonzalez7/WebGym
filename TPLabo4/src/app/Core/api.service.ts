import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Excercise, FavouriteExcercise, User } from './models';
/*import { FormGroup } from '@angular/forms';*/

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseURL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  //#region Users Methods

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseURL}/users`);
  }

  getUserToAuth(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseURL}/users?email=${email}&password=${password}`);
  }  

addUser(createUser: User): Observable<boolean> {
    const url = `${this.baseURL}/users`;
    return this.http.post<boolean>(url, createUser);
  }


/*
  editPerson(id: number, updatePerson: Person): Observable<boolean> {
    const url = `${this.baseURL}/persons/${id}`;
    return this.http.put<boolean>(url, updatePerson);
  }

  deletePerson(id: number): Observable<boolean> {
    return this.http.delete(`${this.baseURL}/persons/${id}`)
    .pipe(
      map(resp => true), // Si sale bien retorna true. Recibir un response significa que salio bien
      catchError(error => of(false)) // Si hay algun error en la solicitud me regresa falso
    );
  }*/

  //#endregion

  //#region Routines Methods

  /** Fetches a list of routines from the server.
   *
   * @returns An observable that emits an array of Routine objects.
   */
  getRoutines(): Observable<FavouriteExcercise[]> {
    return this.http.get<FavouriteExcercise[]>(`${this.baseURL}/routines`).pipe(
      map((data: any) => {
        console.log(data[0]);
        return data[0];
      })
    );
  }

  /** Fetches a list of routines for a specific day from the server.
   *
   * @param day - The day of the week for which routines are requested.
   * @returns An observable that emits an array of Routine objects for the specified day.
   */
  getRoutinesByDay(day: string): Observable<FavouriteExcercise[]> {
    return this.http.get<FavouriteExcercise[]>(`${this.baseURL}/routines`).pipe(
      map((data: any) => {
        if (data[day]) {
          return data[day];
        } else {
          return [];
        }
      })
    );
  }

  //#endregion

  //#region excercises

  /** Retrieves all exercises from the API.
 *
 * @returns An observable that emits an array of exercises.
 */
  getExcercises(): Observable<Excercise[]> {
    return this.http.get<Excercise[]>(`${this.baseURL}/excercises`).pipe(
      map((data: any) => {
        console.log(data);
        return data;
      })
    );
  }

  /** Retrieves exercises based on the specified type of exercise.
 *
 * @param typeOfExercise - The type of exercise to filter by.
 * @returns An observable that emits an array of exercises matching the specified type.
 */
  getExcercisesByType(typeOfExcercise: string): Observable<Excercise[]> {
    //Si tuvieramos que usar el bucle de for declaramos este array
    //const excerciseTypeArray: Excercise[] = [];
    return this.http.get<Excercise[]>(`${this.baseURL}/excercises`).pipe(
      map((data: any) => {
        // for(let excercise of data) {
        //   if(excercise.excerciseType == typeOfExcercise)
        //     excerciseTypeArray.push(excercise);
        // }
        // return excerciseTypeArray;

        //Esta es una manera de hacerla con filter, que es la ideal porque te ahorras lineas de codigo y hace lo mismo que arriba
        return data.filter( (excercise: Excercise) => excercise.excerciseType == typeOfExcercise );
      })
    );
  }

  /** Retrieves favorite exercises from the API.
 *
 * @returns An observable that emits an array of favorite exercises.
 */
  getFavouriteExcercises(): Observable<FavouriteExcercise[]> {
    // puedo filtrar por la condicion que sea favorito o no
    // si es favorito, tendria que traer todos esos resultados
    // y guardarlos en un objeto de tipo excercises para poder mostrarlos
    // osea que tendria que guardar en un objeto todos los favoritos
    // recorrer por id de ejercicio e ir guardando esa informacion en un objeto nuevo
    // mostrar el objeto
    // podria tener un flag con si es favorito o no para poder mostrarlo despues
    return this.http.get<FavouriteExcercise[]>(`${this.baseURL}/favourite_excercise?isFavourite=true`);
  }

  /** Checks if an exercise is marked as a favorite.
   *
   * @param excerciseID - The ID of the exercise to check.
   * @returns An observable that emits a boolean indicating whether the exercise is a favorite.
   */
  isExcerciseFavourite(excerciseID: number): Observable<boolean> {
    return this.http.get<FavouriteExcercise[]>(`${this.baseURL}/favourite_excercise`).pipe(
        map((data: any) => {
          // Filtramos la respuesta del get que tiene todos los ejercicios favoritos, si coincide el id recibido por parametro con algun id
          // que ya esta en el objeto de favourite_excercise lo guardamos en una variable
          // si no encuentra nada, devuelve un array vacio, y el metodo retorna un boolean, por lo que si el array es 0, devolveria false
          // y si el array es mayor a cero, devuelve true
          const favouriteExcercise = data.filter( (favExcercise: FavouriteExcercise) => favExcercise.excerciseID == excerciseID );
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
  getFavouriteExcerciseByExcerciseID( excerciseID: number ): Observable<FavouriteExcercise> {
    return this.http.get<FavouriteExcercise[]>(`${this.baseURL}/favourite_excercise`).pipe(
        map((data: any) => {
          return data.filter( (favExcercise: FavouriteExcercise) => favExcercise.excerciseID == excerciseID );
        })
      );
  }

  //ToDo ver como hacer llegar el ID aca ?????
  /** Adds an exercise to the list of favorite exercises.
   *
   * @param exerciseID - The ID of the exercise to add to favorites.
   * @returns An observable that emits the added favorite exercise object.
   */
  addExcerciseToFavourite(excerciseID: number): Observable<FavouriteExcercise> {
    // con el id que recibo por parametro compruebo el ejercico que quiere agregar
    // guardo el ejercicio que quiere como favorito en un nuevo objeto
    // ese nuevo objeto solamente tendria el id de ese propio objeto, y el id del ejercicio que guardo
    // Valido mediante el excerciseID que ya no pertenezca a los favoritos
    let favExcercise = new FavouriteExcercise( {excerciseID: excerciseID,isFavourite: true} );
    return this.http.post<FavouriteExcercise>(`${this.baseURL}/favourite_excercise`,favExcercise);
  }

  //Crear rutina -> seleccionando, ejercicios y asignandole un dia a la rutina
  // Podria tener un creador y eliminar de rutinas
  // Y tambien un filtrador de rutinas por dia
  // Un dia solo no tiene ejercicios
  getFavouriteExcercisesByDay() { }

  //#endregion
}
