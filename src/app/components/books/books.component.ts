import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BooksService } from '../../services/books.service';
import { Book } from '../../types/book';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [AsyncPipe, RouterLink, CommonModule],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  books$!: Observable<Book[]>;
  bookService = inject(BooksService);

  ngOnInit(): void {
    this.getBooks();
  }

  // Method to track items by ID
  trackById(index: number, item: Book): number {
    return item.id;
  }

  delete(id: number) {
    this.bookService.deleteBook(id).subscribe({
      next: () => {
        this.getBooks();
      },
    });
  }

  private getBooks(): void {
    this.books$ = this.bookService.getBooks();
  }
}
