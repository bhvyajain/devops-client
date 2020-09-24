import { Component, OnInit } from '@angular/core';
import { Author } from '../service/author';
import { SimpleauthorService } from '../service/simple-author-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-author-create',
  templateUrl: './author-create.component.html',
  styleUrls: ['./author-create.component.css'],
})
export class AuthorCreateComponent implements OnInit {
  constructor(
    private authorService: SimpleauthorService,
    private router: Router
  ) {}
  public author: Author;
  public errors = [];

  ngOnInit(): void {
    this.author = this.createauthor();
  }

  createauthor(): Author {
    return {
      id: '',
      name: '',
      biography: '',
      dateofbirth: '',
      email: '',
      listofbooks: '',
    };
  }
  onAddauthor() {
    this.errors = [];

    if (!this.author.id) {
      this.errors.push('id number missing');
    }

    if (!this.author.name) {
      this.errors.push('name is missing');
    }

    if (!this.author.email) {
      this.errors.push('email is missing');
    }

    if (this.errors.length > 0) {
      console.log('invalid input');
    } else {
      this.authorService.addauthor(this.author);
      console.log('total authors ', this.authorService.getauthors());
      this.router.navigateByUrl('/author/list'); 
    }
  }
}
