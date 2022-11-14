import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthorComponent } from '../author/author.component';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { FetchApiDataServie } from '../fetch-api-data.service';
import { GenreComponent } from '../genre/genre.component';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent {
  books: any[] = [];
  favorites: any[] = [];

  constructor(public fetchApiData: FetchApiDataServie,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) { }

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
    this.fetchApiData.userProfile().subscribe((resp: any) => {
      this.favorites = resp.FavoriteBooks;
      console.log(this.favorites);
      return this.favorites;
    });
  }

  isFavorite(id: string): boolean {
    return this.favorites.includes(id);
  }

  addToFavorites(id: string) : void {
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
    console.log(id);
    this.fetchApiData.removeFavorite(id).subscribe((result) => {
      console.log(result);
      this.snackBar.open('book removed from favorites', 'ok', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  openGenre(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      panelClass: 'genre-dialog-background',
      width: '400px',
    });
  }

  opneAuthor(name: string, bio: string, birthday: string): void {
    this.dialog.open(AuthorComponent, {
      data: {
        name: name,
        bio: bio,
        birthday: birthday,
      },
      panelClass: 'author-dialog-background',
      width: '400px',
    })
  }

  openSummary(title: string, description: string): void {
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
