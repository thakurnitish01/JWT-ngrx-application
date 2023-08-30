import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MastersService } from 'src/app/Shared/masters.service';
import firebase from 'firebase/compat/app';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  loggedInUser: firebase.User | null = null;
  private tokenExpirationSubscription: Subscription | undefined;

  constructor(private router: Router, private master: MastersService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.email),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      this.master
        .login(email, password)
        .then(() => {
          console.log("Login Successfully..");
          this.router.navigate(['/dashboard'])
          this.saveTokenToLocalStorage();
          this.startTokenExpirationCheck();
        })
        .catch(error => {
          console.log("Something went wrong with login", error);
        });
    }
  }

  saveTokenToLocalStorage() {
    const { token, expiration } = this.master.getAuthTokenWithExpiration();

    if (token && expiration) {
      localStorage.setItem('authToken', token);
      localStorage.setItem('authTokenExpiration', expiration.toString());
      console.log('Token saved to local storage:', token);
      console.log('Token expiration:', new Date(expiration).toLocaleString());
    }
  }

  startTokenExpirationCheck() {
    const expiration = parseInt(localStorage.getItem('authTokenExpiration') || '0', 10);
    if (expiration) {
      this.tokenExpirationSubscription = this.master.onTokenExpiration().subscribe(() => {
        console.log('Token has expired. Logging out...');
        this.master.logout()
        localStorage.clear();
        this.router.navigate([''])
      });
    }
  }

  ngOnDestroy(): void {
    if (this.tokenExpirationSubscription) {
      this.tokenExpirationSubscription.unsubscribe();
    }
  }
}
