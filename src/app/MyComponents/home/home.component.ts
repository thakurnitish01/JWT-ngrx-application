import { Component, OnInit } from '@angular/core';
import { MastersService } from 'src/app/Shared/masters.service';
import firebase from 'firebase/compat/app'
import { stringify } from 'uuid';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loggedInUser: firebase.User | null = null;

  constructor(private master: MastersService) { }

  ngOnInit(): void {
    this.getLoginUser();
  }

  getLoginUser() {
    this.master.getLoggedInUser().subscribe((user) => {
      this.loggedInUser = user;
      if (user) {
        console.log("The logged-in user's email is:", user.email);
        localStorage.setItem("user email", user.email as string);
      }
    });
  }
  
}
