import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './MyComponents/login/login.component';
import { HomeComponent } from './MyComponents/home/home.component';
import { BlogsComponent } from './MyComponents/blogs/blogs.component';
import { TasksComponent } from './MyComponents/tasks/tasks.component';

const routes: Routes = [
  {path : '', component : LoginComponent},
  {path : 'dashboard', component : HomeComponent},
  {path : 'blogs', component : BlogsComponent},
  {path : 'tasks', component : TasksComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
