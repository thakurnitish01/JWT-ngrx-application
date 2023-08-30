// import { BlogModel } from "./blog.model";

export interface Item {
    id: string ;
    task: string;
    userId : string;
  }
  export interface Blog{
    id : string ,
    title : string, 
    body:string, 
}
  export interface AppState {
    items: Item[];
    blog : Blog[];
  }