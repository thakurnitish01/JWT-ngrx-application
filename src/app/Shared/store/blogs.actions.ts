import { createAction, props } from "@ngrx/store";
import { Blog, Item } from "./blogs.state";

export const loadBlog = createAction('loadblog'); 

export const getPostsData =  createAction('[Blog] Blog')
export const getpostSuccess =  createAction('[Blog] Blog Post Success', props<{blog : Blog[]}>())
export const getpostFailure =  createAction('[Blog] Blog Post Failure', props<{error : string}>())

export const login = createAction('[Auth] Login', props<{ email: string; password: string }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ userId: string }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());

// Create
export const addItem = createAction('[Item] Add Item', props<{ item: Item }>());
export const addItemSuccess = createAction('[Item] Add Item Success', props<{ item: Item }>());
export const addItemFailure = createAction('[Item] Add Item Failure', props<{ error: string }>());

// Read
export const loadItems = createAction('[Item] Load Items');
export const itemsLoaded = createAction('[Item] Items Loaded', props<{ items: Item[] }>());
export const loadItemsFailure = createAction('[Item] Load Items Failure', props<{ error: string }>()); // Define the loadItemsFailure action here

// Update
export const updateItem = createAction('[Item] Update Item', props<{ item: Item }>());
export const updateItemSuccess = createAction('[Item] Update Item Success', props<{ item: Item }>());
export const updateItemFailure = createAction('[Item] Update Item Failure', props<{ error: string }>());

// Delete
export const deleteItem = createAction('[Item] Delete Item', props<{ id: any }>());
export const deleteItemSuccess = createAction('[Item] Delete Item Success', props<{ id: string }>());
export const deleteItemFailure = createAction('[Item] Delete Item Failure', props<{ error: string }>());
// export const deleteItem = createAction('[Item] Delete Item', props<{ id: number }>()); // Change the type to number
