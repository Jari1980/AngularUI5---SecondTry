import { Component } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent {
  book: Book = {
    name: '',
    author: '',
    published: ''
  };
  submitted = false;

  constructor(private bookService: BookService, private router: Router) { }

  saveBook(): void {
    const data = {
      name: this.book.name,
      author: this.book.author,
      published: this.book.published
    };

    this.bookService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/books']);
          //this.submitted = true;
        },
        
        error: (e) => console.error(e)
        
      });
  }

  newBook(): void {
    this.submitted = false;
    this.book = {
      name: '',
      author: '',
      published: ''
    };
  }
}
