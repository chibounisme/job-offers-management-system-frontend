import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginError: boolean = false;
  isRememberMeCheckboxChecked: boolean = false;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {

    if (window.localStorage.getItem('remember_email')) {
      this.isRememberMeCheckboxChecked = true;
      this.loginForm.controls.email.setValue(window.localStorage.getItem('remember_email'));
    }
  }

  loginForm = this.formBuilder.group({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit(): void {
  }

  login() {
    if (this.isRememberMeCheckboxChecked)
      window.localStorage.setItem('remember_email', this.loginForm.controls.email.value)
    this.isLoginError = false;
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(res => {
        // sauvegarder les infos du token
        this.authService.setSession(res.token);
        // aller vers home page
        this.router.navigateByUrl('/');
      }, (err) => {
        this.isLoginError = true;
      })
  }

}
