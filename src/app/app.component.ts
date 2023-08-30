import { Component, OnInit } from '@angular/core';
import { MastersService } from './Shared/masters.service';
import firebase from 'firebase/compat/app';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ngrx-project';
  loggedInUser : firebase.User | null = null;
constructor(private master : MastersService){}
  

ngOnInit(): void {
    // this.getLoginUser();
  }

  
  
}
