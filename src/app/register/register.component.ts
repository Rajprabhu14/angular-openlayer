import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { first } from 'rxjs/operators';
import { AlertService } from '../service/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  loading =false;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService:AuthService,
              private userService: UserService,
              private alertService: AlertService) { }
  hide = true;
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      email:['', Validators.required],
      password: ['', [Validators.required, 
                      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]
    });
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/']);
    }
  }
  // convenience getter for easy access to form fields
  get f(){
    return this.registerForm.controls;
  }
  onSubmit(){
    this.submitted = true;
    if(this.registerForm.invalid)
      return;
    this.userService.regsiter(this.registerForm.value)
        .pipe(first())
        .subscribe(
          (data) => {
            this.alertService.success('Registration successful. For activation kindly check mail', true);
            this.router.navigate(['/']);
            
          },
          error => {
            let err_msg = '';
            for(let err in error){
              error[err].forEach(element => {
                err_msg += err + ': ' +element + '; '
              });
             
            }
            this.alertService.error(err_msg);
            this.loading = false;
          }
        );
  }
  clearInput() {
    this.registerForm.reset();
    
  }

}
