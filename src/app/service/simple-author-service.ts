import { Author } from './author';
import { AuthorService } from './author-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Injectable()
export class SimpleauthorService implements AuthorService {
  constructor(private http: HttpClient) {
    this.serviceId = ++SimpleauthorService.serviceCount;
    console.log(`SimpleauthorService created with id ${this.serviceId}`);
  }
  static serviceCount = 0;

  public authors: Author[] = [];
  public serviceId;
  public update = new Subject<Author[]>();
  Author;
  addauthor(author: Author): boolean {
    if (author && author.id && author.name) {
      this.http
        .post<{ message: string; result: Author[] }>(
          'http://localhost:8030/api/author/addauthor/',
          author
        )
        .subscribe((output) => {
          console.log(output);
          const list = output;
          console.log(list.result);
        console.log('test');
          this.authors = list.result;
          this.update.next([...this.authors]);
        });

      return true;
    } else {
      return false;
    }
  }

  getauthors(): any {
    this.http
      .get<{ message: string; result: Author[] }>(
        'http://localhost:8030/api/author/findall'
      )

      .subscribe((output) => {
        const list = output;
        console.log(list.result);
        this.authors = list.result;
        console.log('list', this.authors);
        this.update.next([...this.authors]);
        return this.authors;
      });
  }
  getupdate() {
    this.update.asObservable();
  }
  getauthor(id: string) {
    this.http
      .get('http://localhost:8030/api/author/find/' + id)
      .subscribe((output) => {
        console.log(output);
      });
    return this.authors.find((b) => b.id === id);
  }
  removeauthor(id: string) {
    const newList = [];
    this.http
      .delete('http://localhost:8030/api/author/removeauthor/' + id)
      .subscribe((output) => {
        console.log(output);
        // this.update.next([...this.authors]);
      });
  }
}
