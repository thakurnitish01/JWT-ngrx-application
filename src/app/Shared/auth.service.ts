import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, from, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as authActions from './store/blogs.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private store: Store) {}

  login(email: string, password: string): Observable<string | any> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      map(userCredential => {
        const userId = userCredential.user?.uid;
        this.store.dispatch(authActions.loginSuccess({ userId: userId || '' }));
        return userId;
      }),
      catchError(error => {
        this.store.dispatch(authActions.loginFailure({ error }));
        return of(null);
      })
    );
  }
}
