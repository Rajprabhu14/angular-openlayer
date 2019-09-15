import { Component, OnInit, OnDestroy } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userName;
  isLoggedIn = false;
  constructor(public dialog: MatDialog, private authService: AuthService, private router: Router) { }
  openDialog() {
    this.dialog.open(LoginComponent, {
      height: '320px',
      width: '400px',
    });
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
    this.isLoggedIn = false;
  }
  ngOnInit() {
    this.authService.currentUser.subscribe((name) => {
      this.userName = this.authService.getUserName();
      this.isLoggedIn = this.authService.isLoggedIn();
    });
  }
  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.authService.getLoggedInName.unsubscribe();
}

}
