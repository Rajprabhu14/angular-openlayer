import { Component, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { User } from './../user';
import { AuthService } from './../service/auth.service';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted  =  false;

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router

  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

  login() {
    console.log(this.loginForm.value);
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }
    this.authService.login(this.loginForm.value);
    this.router.navigateByUrl('/map');
    this.dialogRef.close();
  }

  get formControls() { return this.loginForm.controls; }
}
