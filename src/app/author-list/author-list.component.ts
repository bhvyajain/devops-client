import { Component, OnInit } from '@angular/core';
import { Author } from '../service/author';
import { RangeInfo } from '../ca-range/ca-range.component';
import { SimpleauthorService } from '../service/simple-author-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css'],
})
export class AuthorListComponent implements OnInit {
  public authors: Author[];
  public sub: Subscription;
  constructor(private authorService: SimpleauthorService) {}

  ngOnInit(): void {
    this.authorService.getauthors();
    this.sub = this.authorService.update.subscribe((result) => {
      console.log('sub', result);
      this.authors = result;
    });

    // s console.log('author', this.sub);
  }

  onImageWidthInfoChanged(r: RangeInfo) {
    //console.log(r);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
