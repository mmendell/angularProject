import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  goToBooks(): void {
    this.router.navigate(['books']);
  }

  goToProfile(): void {
    this.router.navigate(['profile']);
  }

  logOut(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }

}
