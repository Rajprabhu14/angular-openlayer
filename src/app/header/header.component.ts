import { Component, OnInit, OnDestroy } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userName;
  constructor(public dialog: MatDialog, private authService: AuthService) { }
  openDialog() {
    this.dialog.open(LoginComponent, {
      height: '320px',
      width: '400px',
    });
  }
  ngOnInit() {
    this.authService.getLoggedInName.subscribe(name => this.userName = name);
  }
  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.authService.getLoggedInName.unsubscribe();
}

}
