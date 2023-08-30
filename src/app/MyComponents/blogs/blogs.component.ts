import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { getPostsData } from 'src/app/Shared/store/blogs.actions';
import { AppState, Blog, Item } from 'src/app/Shared/store/blogs.state';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  blogs$: Observable<Blog[]> = of([]); // Initialize with an empty array

  constructor(
    private store: Store<{ blog: AppState }>
  ) {}
  
  data: any;

  ngOnInit(): void {
    if (localStorage.getItem('blogs')) {
      this.data = localStorage.getItem('blogs');
      const parsedData = JSON.parse(this.data);
      this.blogs$ = of(parsedData); // Assign the parsed data to blogs$
    } else {
      this.store.dispatch(getPostsData());
      this.blogs$ = this.store.select(state => state.blog.blog).pipe(
        map((items: Blog[]) => items.map(item => ({
          id: item.id, // Use the correct id from Item type
          title: item.title,
          body: item.body
        }))),
        tap((blogs: Blog[]) => {
          localStorage.setItem('blogs', JSON.stringify(blogs));
        })
      );
    }
  }
}
