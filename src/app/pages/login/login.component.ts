import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginError: boolean = false;
  isRememberMeCheckboxChecked: boolean = false;
  clickedGoogle: boolean = false;
  constructor(private socialAuthService: SocialAuthService, private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {

    if (window.localStorage.getItem('remember_email')) {
      this.isRememberMeCheckboxChecked = true;
      this.loginForm.controls.email.setValue(window.localStorage.getItem('remember_email'));
    }
  }

  signInWithGoogle() {
    this.isLoginError = false;
    this.clickedGoogle = true;
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(_ => {
      this.socialAuthService.authState.subscribe(user => {
        console.log(user);
        if (user) {
          this.authService.saveLoginSocialMedia(user).subscribe((res: any) => {
            this.authService.setSessionSocialMedia(res.token, 'google');
            this.router.navigateByUrl('/');
          }, (err) => {
            if (this.clickedGoogle)
            this.isLoginError = true;
          });
        }
      });
    });
  }

  loginForm = this.formBuilder.group({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit(): void {
  }
  
  login() {
    this.clickedGoogle = false;
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
