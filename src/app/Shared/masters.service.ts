import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Observable, Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MastersService {
  baseUrl = "http://localhost:3000";
  loggedInUser: firebase.User | null = null;
  private tokenExpirationSubject = new Subject<void>();
 
  constructor(
    private http: HttpClient,
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private router: Router
  ) { }

  getAllBlogs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/posts`);
  }

  login(email: string, password: string): Promise<void> {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const userId = userCredential.user?.uid;

        if (userId) {
          const { token, expiration } = this.getAuthTokenWithExpiration();

          const userData = {
            token,
            expiration
          };

          return this.angularFirestore.collection('users').doc(userId).set(userData)
            .then(() => {
              console.log("The Current User Id :", userId);
              this.router.navigate(['/dashboard']);
              localStorage.setItem('userId', userId);
              this.startTokenExpirationCheck(expiration);
            })
            .catch((error: any) => {
              console.error('Error setting user data in Firestore:', error);
            });
        } else {
          console.error('User UID not available.');
          throw new Error('User UID not available.'); 
        }
      })
      .catch((error) => {
        console.error('Error logging in:', error);
        throw error; 
      });
  }
 
  getLoggedInUser(): Observable<firebase.User | null> {
    return this.angularFireAuth.user;
  }

  generateToken(): { token: string; expiration: number } {
    const token = uuidv4();
    const expiration = Date.now() + 600 * 1000; // Set the expiration time to n 6 hours from now
    return { token, expiration };
  }

  getAuthTokenWithExpiration(): { token: string; expiration: number } {
    return this.generateToken();
  }

  isTokenValid(expiration: number): boolean {
    return Date.now() < expiration;
  }
  
  startTokenExpirationCheck(expiration: number) {
    const expirationTime = expiration - Date.now();
    
    setTimeout(() => {
      if (!this.isTokenValid(expiration)) {
        this.tokenExpirationSubject.next();
      }
    }, expirationTime);
  }

  onTokenExpiration(): Observable<void> {
    return this.tokenExpirationSubject.asObservable();
  }
  logout() {
    this.angularFireAuth.signOut().then(() => {
      console.log('User logged out successfully');
      this.router.navigate(['']); 
    });
  }
}
