import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Author } from '../service/author';
import { SimpleauthorService } from '../service/simple-author-service';

@Component({
  selector: 'app-author-info',
  templateUrl: './author-info.component.html',
  styleUrls: ['./author-info.component.css'],
}) 
export class AuthorInfoComponent implements OnInit {
  @Input() public author: Author;

  constructor(
    private authorService: SimpleauthorService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  ondelete(id: string) {
    this.authorService.removeauthor(id);
    console.log('total authors ', this.authorService.getauthors());
    this.router.navigateByUrl('/author/list');
  }
}
