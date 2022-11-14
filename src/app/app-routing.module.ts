import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookCardComponent } from './book-card/book-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'books', component: BookCardComponent},
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix'},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
