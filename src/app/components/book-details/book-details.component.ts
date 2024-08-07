import { Component, Input, OnInit, inject } from '@angular/core';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../models/book.model';
import { filter } from 'rxjs';
import { AuthService } from '../../auth.service';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from '../../user.interface';


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit{
  @Input() viewMode = false;
  http = inject(HttpClient);
  authService = inject(AuthService);

  @Input() currentBook: Book = {
    name: '',
    author: '',
    published: ''
  };
  
  message = '';

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {  //(!this.viewMode)
      this.message = '';
      this.getBook(this.route.snapshot.params["id"]);
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
  }

  getBook(id: string): void {
    this.bookService.get(id)
      .subscribe({
        next: (data) => {
          this.currentBook = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updatePublished(status: boolean): void {
    const data = {
      name: this.currentBook.name,
      author: this.currentBook.author,
      published: status
    };

    this.message = '';

    this.bookService.update(this.currentBook.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          //this.currentBook.published = status;
          //this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updateBook(): void {
    this.message = '';

    this.bookService.update(this.currentBook.id, this.currentBook)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/books']);
          //this.message = res.message ? res.message : 'This tutorial was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteBook(): void {
    this.bookService.delete(this.currentBook.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/books']);
        },
        error: (e) => console.error(e)
      });
  }
}  
    
  
