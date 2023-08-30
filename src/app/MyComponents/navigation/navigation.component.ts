import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  dialogRef!: MatDialogRef<any>;

  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private dialog: MatDialog
  ) {}

  isMobileMenuOpen: boolean = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  ngOnInit(): void {
  }

  showLogoutConfirmation(): void {
    this.dialogRef = this.dialog.open(LogoutConfirmationDialogComponent, {
    });

    this.dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.logout();
      }
    });
  }

  logout() {
    this.angularFireAuth.signOut().then(() => {
      console.log('User logged out successfully');
      this.router.navigate(['']); // Navigate to the desired page after logout
      localStorage.clear();
    });
  }
}

@Component({
  selector: 'app-logout-confirmation-dialog',
  templateUrl: './dialog.component.html', 
})
export class LogoutConfirmationDialogComponent {
  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth,
  ) {}

  Logout() {
    this.angularFireAuth.signOut().then(() => {
      console.log('User logged out successfully');
      this.router.navigate(['']); 
      localStorage.clear();
    });
  }
}
