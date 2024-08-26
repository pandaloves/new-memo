import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../types/book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  apiUrl = 'http://localhost:5280/api/Book'; 
  constructor(private http: HttpClient) {}
  getBooks = (): Observable<Book[]> => this.http.get<Book[]>(this.apiUrl);

  addBook = (data: Book) => this.http.post(this.apiUrl, data);

  getBook = (id: number): Observable<Book> =>
    this.http.get<Book>(this.apiUrl + '/' + id);

  deleteBook = (id: number) => this.http.delete(this.apiUrl + '/' + id);

  editBook = (id: number, data: Book) =>
    this.http.put(this.apiUrl + '/' + id, data);
}
