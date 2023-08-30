import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as blogActions from './blogs.actions';
import { ItemService } from '../item.service';
import { MastersService } from '../masters.service';
import { Blog } from './blogs.state';
// import { Blog } from './blogs.state'\
@Injectable()
export class BlogsEffects {

  constructor(
    private actions$: Actions,
    private itemService: ItemService,
    private masterService : MastersService
  ) {}

  getPosts$ = createEffect(() =>
  this.actions$.pipe(
    ofType(blogActions.getPostsData),
    switchMap(() =>
      this.masterService.getAllBlogs().pipe(
        tap((blog: Blog[]) => {
          localStorage.setItem('blogs', JSON.stringify(blog)); // Save to local storage
        }),
        map((blog: Blog[]) => blogActions.getpostSuccess({ blog })),
        catchError(error => of(blogActions.getpostFailure({ error })))
      )
    )
  )
);
  

  // Load Items
  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(blogActions.loadItems),
      switchMap(() =>
        this.itemService.loadItems().pipe(
          map(items => blogActions.itemsLoaded({ items })),
          catchError(error => of(blogActions.loadItemsFailure({ error }))) // Corrected action name here
        )
      )
    )
  );

  // Add Item
  addItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(blogActions.addItem),
      switchMap(action =>
        this.itemService.addItem(action.item).pipe(
          map(() => blogActions.addItemSuccess({ item: action.item })),
          catchError(error => of(blogActions.addItemFailure({ error })))
        )
      )
    )
  );

  // Update Item
  updateItem$ = createEffect(() =>
  this.actions$.pipe(
    ofType(blogActions.updateItem),
    switchMap(action =>
      this.itemService.updateItem(action.item).pipe(
        map(updatedItem => blogActions.updateItemSuccess({ item: updatedItem })),
        catchError(error => of(blogActions.updateItemFailure({ error })))
      )
    )
  )
);


  // Delete Item
  deleteItem$ = createEffect(() =>
  this.actions$.pipe(
    ofType(blogActions.deleteItem),
    switchMap(action =>
      this.itemService.deleteItem(action.id).pipe(
        map(() => blogActions.deleteItemSuccess({ id: action.id })),
        catchError(error => of(blogActions.deleteItemFailure({ error })))
      )
    )
  )
);

}
