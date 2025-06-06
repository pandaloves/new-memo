import { Injectable } from '@angular/core';
import { Quote } from '../types/quote';
import { Observable, of } from 'rxjs';
import { quotes as initialQuotes } from '../utils/mock'; 

const LOCAL_STORAGE_KEY = 'quotesData';

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  private get quotes(): Quote[] {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [...initialQuotes];
  }

  private set quotes(newQuotes: Quote[]) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newQuotes));
  }

  getQuotes(): Observable<Quote[]> {
    return of(this.quotes);
  }

  getQuote(id: number): Observable<Quote | undefined> {
    const quote = this.quotes.find(b => b.id === id);
    return of(quote);
  }

  addQuote(data: Quote): Observable<Quote> {
    const quotes = this.quotes;
    const newQuote: Quote = {
      ...data,
      id: quotes.length > 0 ? Math.max(...quotes.map(b => b.id)) + 1 : 1,
    };
    quotes.push(newQuote);
    this.quotes = quotes;
    return of(newQuote);
  }

  editQuote(id: number, updatedData: Quote): Observable<Quote | undefined> {
    const quotes = this.quotes;
    const index = quotes.findIndex(b => b.id === id);
    if (index > -1) {
      quotes[index] = { ...updatedData, id };
      this.quotes = quotes;
      return of(quotes[index]);
    }
    return of(undefined);
  }

  deleteQuote(id: number): Observable<void> {
    const quotes = this.quotes.filter(b => b.id !== id);
    this.quotes = quotes;
    return of(void 0);
  }
}
