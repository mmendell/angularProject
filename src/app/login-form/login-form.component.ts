import { Component, Input, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

import { FetchApiDataService } from '../fetch-api-data.service';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  @Input() userCredentials = { username: '', password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<LoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void { }

  
  loginUser(): void {
    this.fetchApiData.userLogin(this.userCredentials).subscribe(
      (result) => {
        console.log(result);
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', result.user.username);
        this.dialogRef.close(); // Close the modal on success
        this.router.navigate(['books']);
      },
      (result) => {
        console.log(result);
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
