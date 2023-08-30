import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addItem, deleteItem, loadItems, updateItem } from 'src/app/Shared/store/blogs.actions';
import { AppState, Item } from 'src/app/Shared/store/blogs.state';
import * as uuid from 'uuid';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  items$!: Observable<Item[]>; 
  newItemName = ''; 
  updateItemId = ''; // Holds the ID of the task being updated

  constructor(private store: Store<{ blog: AppState }>) {}

  ngOnInit(): void {
    this.items$ = this.store.select(state => state.blog.items);
    this.store.dispatch(loadItems());
  }

  addItem(): void {
    if (this.newItemName.trim() !== '') {
      if (this.updateItemId) {
        // If update mode, perform update instead of add
        const updatedItem: Item = {
          id: this.updateItemId,
          task: this.newItemName,
          userId: ''
        };
        this.store.dispatch(updateItem({ item: updatedItem }));
        this.updateItemId = ''; // Clear update mode
      } else {
        // If add mode
        const newItem: Item = {
          id: uuid.v4(),
          task: this.newItemName,
          userId: ''
        };
        this.store.dispatch(addItem({ item: newItem }));
      }
      this.newItemName = ''; 
    }
  }

  populateInputForUpdate(task: Item): void {
    this.updateItemId = task.id;
    this.newItemName = task.task;
  }

  deleteItem(id: string): void {
    this.store.dispatch(deleteItem({ id }));
  }
}
