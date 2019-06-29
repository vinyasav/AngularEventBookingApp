
import {map, publishLast, refCount} from 'rxjs/operators';
import { BookNav } from './../../catalog/models/book-nav';
import { Book } from './../../catalog/models/book';
import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from "rxjs";

@Injectable()
export class BooksService {

  list$: Observable<Book[]>;
  availableSeats:number;

  constructor(private http: Http) {
    // keep in cache the last result  
    this.list$ = this.loadBooks().pipe(publishLast(),refCount(),);

    
  }

  fetchBooks(): Observable<Book[]> { // Array<Book>
    return this.list$;
  }


  getBook(bookId: string): Observable<BookNav> {
    return this.fetchBooks().pipe(map(books => {

      const book = books.filter(b => b.id === bookId)[0];
      const index = books.indexOf(book);
      const count = books.length;
      const previousId = index > 0 ? books[index - 1].id : null;
      const nextId = index < count - 1 ? books[index + 1].id : null;
      return { book, previousId, nextId, index, count };
    }));
  }

  loadBooks(): Observable<Book[]> {
    const bookApi = '../../../assets/events.json';
    return this.http.get(bookApi).pipe(map(data => data.json()),
                    map(obj => Object.values(obj)),);

  }


}
