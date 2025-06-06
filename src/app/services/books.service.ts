import { Injectable } from '@angular/core';
import { Book } from '../types/book';
import { Observable, of } from 'rxjs';
import { books as initialBooks } from '../utils/mock'; // adjust path as needed

const LOCAL_STORAGE_KEY = 'booksData';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private get books(): Book[] {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [...initialBooks];
  }

  private set books(newBooks: Book[]) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newBooks));
  }

  getBooks(): Observable<Book[]> {
    return of(this.books);
  }

  getBook(id: number): Observable<Book | undefined> {
    const book = this.books.find(b => b.id === id);
    return of(book);
  }

  addBook(data: Book): Observable<Book> {
    const books = this.books;
    const newBook: Book = {
      ...data,
      id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1,
    };
    books.push(newBook);
    this.books = books;
    return of(newBook);
  }

  editBook(id: number, updatedData: Book): Observable<Book | undefined> {
    const books = this.books;
    const index = books.findIndex(b => b.id === id);
    if (index > -1) {
      books[index] = { ...updatedData, id };
      this.books = books;
      return of(books[index]);
    }
    return of(undefined);
  }

  deleteBook(id: number): Observable<void> {
    const books = this.books.filter(b => b.id !== id);
    this.books = books;
    return of(void 0);
  }
}
