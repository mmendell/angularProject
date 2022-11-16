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

  getBooks(): void {
    this.fetchApiData.getAllBooks().subscribe((resp: any) => {
      this.books = resp;
      console.log(this.books);
      return this.books;
    });
  }

  getFavorites(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favoriteBooks = resp.favoriteBook;
      console.log(this.favoriteBooks);
      return this.favoriteBooks;
    });
  }

  isFav(id: string): boolean {
    return this.favoriteBooks.includes(id);
  }

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

  removeFromFavorites(id: string): void {
    this.fetchApiData.removeFavoriteBook(id).subscribe((result) => {
      console.log(result);
      this.snackBar.open('book removed from favorites', 'ok', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

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
