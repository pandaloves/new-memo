import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Quote } from '../types/quote';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  apiUrl = 'http://localhost:5280/api/Quote';
  constructor(private http: HttpClient) {}
  getQuotes = (): Observable<Quote[]> => this.http.get<Quote[]>(this.apiUrl);

  addQuote = (data: Quote) => this.http.post(this.apiUrl, data);

  getQuote = (id: number): Observable<Quote> =>
    this.http.get<Quote>(this.apiUrl + '/' + id);

  deleteQuote = (id: number) => this.http.delete(this.apiUrl + '/' + id);

  editQuote = (id: number, data: Quote) =>
    this.http.put(this.apiUrl + '/' + id, data);
}
