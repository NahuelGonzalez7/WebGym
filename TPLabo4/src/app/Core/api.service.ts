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

  /**
   * @method getUsers: Retrieves a list of users from the server. 
   * This method sends an HTTP GET request to the server to fetch a list of users.
   * @returns {Observable<User[]>} An observable of an array of User objects representing the users.
   * @throws {Error} If the HTTP request fails or encounters an error.
   */

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseURL}/users`);
  }

/**
   * @method getUserToAuth: Retrieves user information for authentication.This method sends an HTTP GET request to the server to fetch user information
   * based on the provided email and password.
   * @param {string} email - The email address of the user.
   * @param {string} password - The password of the user.
   * @returns {Observable<User[]>} An observable of an array of User objects representing the authenticated user.
   * @throws {Error} If the HTTP request fails or encounters an error.
   */

  getUserToAuth(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseURL}/users?email=${email}&password=${password}`);
  }  

  getUserLogged(email: string, password: string): Observable<User> {
    //ToDo Ver como me devuelve este metodo el user y tratar de convertirlo a obj
    return this.http.get<User>(`${this.baseURL}/users?email=${email}&password=${password}`);
  }  

  /**
   * @method addUser: Adds a new user to the system. This method sends an HTTP POST request to the server to create a new user.
   * @param {User} createUser - The user object containing information for creating the new user.
   * @returns {Observable<boolean>} An observable indicating whether the user creation was successful (true) or not (false).
   * @throws {Error} If the HTTP request fails or encounters an error.
   */

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

  /**
   * @method duplicateEmail: Checks if an email address already exists in the system. 
   * This method sends an HTTP GET request to the server to check if a user with the provided email address already exists.
   * @param {string} email - The email address to check for duplication.
   * @returns {Observable<User[]>} An observable of an array of User objects representing users with the provided email.
   * @throws {Error} If the HTTP request fails or encounters an error.
   */

  
  duplicateEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseURL}/users?email=${email}`);
  }  

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
