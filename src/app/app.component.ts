import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RoadataApp';
  constructor(private authService: AuthService,
    private router: Router) {
  // redirect to home if already logged in
  if(this.authService.currentUserValue){
    this.router.navigate(['/']);
  }
  }
}
