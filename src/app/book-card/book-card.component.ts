import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { GenreComponent } from '../genre/genre.component';
import { AuthorComponent } from '../author/author.component';
import { BookDetailsComponent } from '../book-details/book-details.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent {
  books: any[] = [];
  favoriteBooks: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getBooks();
    this.getFavorites();
  }

  /**
   * fetch books through api, returns as a json
   * @returns array containing all book obhects
   * @function getBooks
   */
  getBooks(): void {
    this.fetchApiData.getAllBooks().subscribe((resp: any) => {
      this.books = resp;
      console.log(this.books);
      return this.books;
    });
  }

  /**
   * fetches user favorites by api
   * @returns user favorite selected by bookId
   * @function getFavorites
   */
  getFavorites(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favoriteBooks = resp.favoriteBook;
      console.log(this.favoriteBooks);
      return this.favoriteBooks;
    });
  }

  /**
   *
   * @param id strimg returnong if true shows as favorite
   * @returns user favorite
   * @fucntion isFav
   */

  isFav(id: string): boolean {
    return this.favoriteBooks.includes(id);
  }

  /**
   * adds to user favorites by id
   * @param id
   * @function addToFavorites
   */
  addToFavorites(id: string): void {
    console.log(id);
    this.fetchApiData.addFavoriteBook(id).subscribe((result) => {
      console.log(result);
      this.snackBar.open('book added to favorites', 'ok', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }
  /**
   * removes from user favorites
   * @param id
   * @function removeFromFavorites
   */
  removeFromFavorites(id: string): void {
    this.fetchApiData.removeFavoriteBook(id).subscribe((result) => {
      console.log(result);
      this.snackBar.open('book removed from favorites', 'ok', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }
  /**
   * opens the view of genre details
   * @param {string} name
   * @param {string} description
   * @function openGenreDialog
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      panelClass: 'genre-dialog-background',
      width: '400px',
    });
  }

  /**
   * opens thbe author details view
   * @param {string} name
   * @param {string} bio
   * @param {string} birth
   * @function openAuthorDialog
   */
  openAuthorDialog(name: string, bio: string, birth: string): void {
    this.dialog.open(AuthorComponent, {
      data: {
        name: name,
        bio: bio,
        birthday: birth,
      },
      panelClass: 'author-dialog-background',
      width: '400px',
    });
  }

  /**
   * opens book details
   * @param {string}title
   * @param {string} description
   * @function openDetailsDialog
   */

  openDetailsDialog(title: string, description: string): void {
    this.dialog.open(BookDetailsComponent, {
      data: {
        description: description,
        title: title,
      },
      panelClass: 'summary-dialog-background',
      width: '400px',
    });
  }
}
