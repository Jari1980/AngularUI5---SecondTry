import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { CitatComponent } from './components/citat/citat.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';

const routes: Routes = [
{path: '', redirectTo: 'books', pathMatch: 'full'},
{path: 'books', component: BookListComponent},
{path: 'books/:id', component: BookDetailsComponent},
{path: 'add', component: AddBookComponent},
{path: 'citat', component: CitatComponent},
{path: 'register', component: RegisterComponent},
{path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
