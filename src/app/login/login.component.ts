import { Component, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { User } from './../user';
import { AuthService } from './../service/auth.service';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { invalid } from 'moment';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted  =  false;
  loading = false;
  returnUrl: string;
  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute

  ) {
    // redirect to home if already logged in
    if(this.authService.currentUserValue){
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
 // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }
  login_old() {
    console.log(this.loginForm.value);
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }
    this.authService.login(this.loginForm.value);
    this.router.navigateByUrl('/map');
    this.dialogRef.close();
  }

  // JWT login & error interceptor
  login() {
    this.isSubmitted = true;
    // stop request if form is invalid
    if(this.loginForm.invalid){
      return;
    }
    this.loading = true;
    this.authService.loginJWT(this.loginForm.value)
    /*** 
     * first will devliver an emptyError to the observer 's error callback
     * if observable completes before any next notification was sent
     ***/
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigate(['map']);
            this.closeDialog();
          },
          error => {
            this.loading = false;
          }
        )
  }

  get formControls() { return this.loginForm.controls; }
}
