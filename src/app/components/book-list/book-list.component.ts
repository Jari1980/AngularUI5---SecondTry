import { Component, inject, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from '../../user.interface';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit{
  books?: Book[];
  currentBook: Book = {};
  currentIndex = -1;
  name = '';
  http = inject(HttpClient);
  authService = inject(AuthService);

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit(): void {
    this.retrieveBooks();
    this.http.get<{user: UserInterface}>('https://api.realworld.io/api/user')
    .subscribe({
      next: (response) =>{
        console.log('response', response);
        this.authService.currentUserSig.set(response.user);
      },
      //error: () => {
        //this.authService.currentUserSig.set(null);
      //}
    });
  }

  retrieveBooks(): void {
    this.bookService.getAll()
      .subscribe({
        next: (data) => {
          this.books = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveBooks();
    this.currentBook = {};
    this.currentIndex = -1;
  }

  setActiveBook(book: Book, index: number): void {
    this.currentBook = book;
    this.currentIndex = index;
  }
  skapaBok(){
    this.router.navigate(['/add']); 
  }
}
