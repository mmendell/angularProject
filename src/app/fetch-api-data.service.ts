import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://fierce-dawn-45347.herokuapp.com/';

//get token
const token = localStorage.getItem('token');
//get username stored in local storage
const username = localStorage.getItem('username');

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  constructor(private http: HttpClient) {}

  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.log('Some error occured:', error.error.message);
    } else {
      console.log(
        `Error Status code ${error.status}, ` + `Error Body is: ${error.error}`
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try gagin later.')
    );
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

  getOneBook(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}books/${title}`, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  getAuthor(author: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .get(`${apiUrl}books/author/${author}`, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  getGenre(genre: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}books/genre/${genre}`, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    return this.http
      .get(`${apiUrl}users/${user}`, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  addFavoriteBook(bookID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .post(
        `${apiUrl}users/${user}/books/${bookID}`,
        { favoriteBook: bookID },
        {
          headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  editUser(updateDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .put(`${apiUrl}users/${user}`, updateDetails, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .delete(`${apiUrl}users/${user}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  removeFavoriteBook(bookId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .delete(`${apiUrl}users/${user}/books/${bookId}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
}
