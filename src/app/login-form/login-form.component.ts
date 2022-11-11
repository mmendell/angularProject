import { Component, OnInit, Input } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

import { FetchApiDataServie } from '../fetch-api-data.service';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  @Input() loginCreds = { username: '', password: ' ' };


  constructor(
    public fetchApiData: FetchApiDataServie,
    public dialogRef: MatDialogRef<LoginFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  loginUSer(): void {
    this.fetchApiData.userLogin(this.loginCreds).subscribe((result) => {
      this.dialogRef.close();
      this.snackBar.open(result, 'ok', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result, 'ok', {
        duration: 2000
      });
    });
  }

}
