import { createReducer, on } from '@ngrx/store';
import * as blogActions from './blogs.actions';
import { AppState, Item } from './blogs.state';

export const initialState: AppState = {
  items: [],
  blog: []
};

export const blogReducer = createReducer(
  initialState,
  on(blogActions.loadBlog, state => ({
    ...state 
  })),
  on(blogActions.getpostSuccess, (state, { blog }) => ({
    ...state,
    blog: [...blog]
  })),
  on(blogActions.getpostFailure, (state, action) => ({
    ...state
  })),
  
  // Load Items
  on(blogActions.itemsLoaded, (state, { items }) => ({
    ...state,
    items: [...items]
  })),  
  on(blogActions.loadItemsFailure, (state, action) => ({
    ...state // Handle failure if needed
  })),

  // Add Item
  on(blogActions.addItemSuccess, (state, { item }) => ({
    ...state,
    items: [...state.items, item]
  })),
  on(blogActions.addItemFailure, (state, action) => ({
    ...state // Handle failure if needed
  })),

  // Update Item
  on(blogActions.updateItemSuccess, (state, { item }) => ({
    ...state,
    items: state.items.map(i => (i.id === item.id ? item : i))
  })),
  on(blogActions.updateItemFailure, (state, action) => ({
    ...state // Handle failure if needed
  })),

  // Delete Item
  on(blogActions.deleteItemSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter(i => i.id !== id)
  })),
  on(blogActions.deleteItemFailure, (state, action) => ({
    ...state // Handle failure if needed
  }))
);
