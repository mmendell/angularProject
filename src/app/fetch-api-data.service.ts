import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://fierce-dawn-45347.herokuapp.com/';
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataServie {
  constructor(private http: HttpClient) {}

  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('some error occurred:', error.error.message);
    } else {
      console.error(
        `error status code ${error.status}, ` + ` error body is ${error.error}`
      );
    }
    return throwError('something bad happened; please try again later');
  }

  getAllBooks(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + 'books', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  register(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .post(apiUrl + 'users', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(map(this.extractResponseData), catchError(this.handleError));
  } 

  selectedBook(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + '/books/:title', {
     headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    }) ,
    })
    .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  author(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + '/books/:author/:name', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  genre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + '/books/:genre/:name', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token, 
      }),
    })
    .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  userProfile(): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + '/users/:username', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token, 
      }),
    })
    .pipe(map(this.extractResponseData), catchError(this.handleError));
  }


  favorites(): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http
    .post(apiUrl + '/users/:username/books/:bookId', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token, 
      }),
    })
    .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  userUpdate(): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http
    .put(apiUrl + '/users/:username', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token, 
      }),
    })
    .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  deleteUser(): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http
    .delete(apiUrl + '/users/:email', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token, 
      }),
    })
    .pipe(map(this.extractResponseData), catchError(this.handleError));
  }


  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
}
