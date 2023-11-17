import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { Excercise, FavouriteExercise, User } from './models';

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

  getUserLogged(email: string, password: string): Observable<User> {
    //ToDo Ver como me devuelve este metodo el user y tratar de convertirlo a obj
    return this.http.get<User>(`${this.baseURL}/users?email=${email}&password=${password}`);
  }  

addUser(createUser: User): Observable<boolean> {
    const url = `${this.baseURL}/users`;
    return this.http.post<boolean>(url, createUser);
  }

  getUserById(userID:number): Observable<User>{
    return this.http.get<User>(`${this.baseURL}/users/${userID}`);
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
  getRoutines(): Observable<FavouriteExercise[]> {
    return this.http.get<FavouriteExercise[]>(`${this.baseURL}/routines`).pipe(
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
  getRoutinesByDay(day: string): Observable<FavouriteExercise[]> {
    return this.http.get<FavouriteExercise[]>(`${this.baseURL}/routines`).pipe(
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

}
