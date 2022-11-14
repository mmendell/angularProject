import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataServie } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  user: any = {};
  initialInput: any = {};
  @Input() updatedUser = {
    username: '',
    password: '',
    email: '',
    birthday: '',
  };

  constructor(
    public fetchApiData: FetchApiDataServie,
    public dialogRef: MatDialogRef<ProfilePageComponent>,
    public snackBar: MatSnackBar,
    public router: Router) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.fetchApiData.userProfile().subscribe((resp: any) => {
      this.user = resp;
      this.updatedUser.username = this.user.username;
      this.updatedUser.password = this.user.password;
      this.updatedUser.email = this.user.email;
      this.updatedUser.birthday = this.user.birthday;
      console.log(this.updatedUser);
      return this.user;
    });
  }

  updateUserInfo(): void {
    this.fetchApiData.userUpdate(this.updatedUser).subscribe((result) => {
      console.log(result);
      this.snackBar.open('User profile successfully updated', 'OK', {
        duration: 2000,
      });
      if (this.user.Username !== result.username) {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open(
          'User profile successfully updated. Please login using your new credentials',
          'OK',
          {
            duration: 2000,
          }
        );
      }
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
