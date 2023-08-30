import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent, LogoutConfirmationDialogComponent } from './MyComponents/navigation/navigation.component';
import { HomeComponent } from './MyComponents/home/home.component';
import { LoginComponent } from './MyComponents/login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http' 
import { StoreModule } from '@ngrx/store';
import { blogReducer } from './Shared/store/blogs.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BlogsComponent } from './MyComponents/blogs/blogs.component';
import {AngularFireModule} from '@angular/fire/compat'
import { environment } from 'src/environments/environment';

import {MatIconModule} from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
import { TasksComponent } from './MyComponents/tasks/tasks.component';
import { EffectsModule } from '@ngrx/effects';
import { BlogsEffects } from './Shared/store/blogs.effects';

import { MatDialogModule } from '@angular/material/dialog'; // Import the MatDialogModule

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,LogoutConfirmationDialogComponent,
    HomeComponent,
    LoginComponent,
    BlogsComponent,
    TasksComponent,
  ],
  imports: [
    BrowserModule,FormsModule,ReactiveFormsModule,  
    AppRoutingModule,HttpClientModule,
    MatIconModule,MatButtonModule,
    BrowserAnimationsModule,
    MatDialogModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    StoreModule.forRoot({blog : blogReducer}),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()}),
    EffectsModule.forRoot([BlogsEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
