import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form:FormGroup;

    constructor(private fb:FormBuilder, private authService: AuthService, private router: Router) {
      this.form = this.fb.group({
        username: ['',Validators.required],
        password: ['',Validators.required]
      });
    }

    login() {
      const val = this.form.value;

      if (val.username && val.password) {
        this.authService.login(val.username, val.password)
          .subscribe(
            () => {
              console.log("User is logged in");
              this.router.navigateByUrl('/home');
            }
          );
      }
    }
}
