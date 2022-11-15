import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataServie } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  user: any = {};


  constructor(
    public fetchApiData: FetchApiDataServie,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.fetchApiData.userProfile().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user;
    });
  }

  openEditProfile(): void {
    this.dialog.open(EditProfileComponent, {
      width: '400px',
    });
  }

  deleteAccount(): void {
    if (confirm('all your data will be ersased. THIS CANNOT BE UNDONE')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open(
          ' your account has been deleted',
          'ok',
          {
            duration: 2000,
          }
        );
      });
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
        localStorage.clear();
      });
    }
  }

}
