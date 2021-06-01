import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginError: boolean = false;
  isRememberMeCheckboxChecked: boolean = false;
  clickedGoogle: boolean = false;
  clickedFacebook: boolean = false;
  constructor(@Inject(DOCUMENT) private document: Document, private socialAuthService: SocialAuthService, private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
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
            this.activateChatbot();
            this.router.navigateByUrl('/');
          }, (err) => {
            if (this.clickedGoogle)
            this.isLoginError = true;
          });
        }
      });
    });
  }

  signInWithFacebook() {
    this.isLoginError = false;
    this.clickedFacebook = true;
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(_ => {
      this.socialAuthService.authState.subscribe(user => {
        console.log(user);
        if (user) {
          this.authService.saveLoginFacebook(user).subscribe((res: any) => {
            this.authService.setSessionSocialMedia(res.token, 'facebook');
            this.activateChatbot();
            this.router.navigateByUrl('/');
          }, (err) => {
            if (this.clickedFacebook)
            this.isLoginError = true;
          });
        }
      });
    });
  }

  activateChatbot() {
    this.document.getElementById('chatbot-chat').style.visibility = 'visible';
  }

  deactivateChatbot() {
    this.document.getElementById('chatbot-chat').style.visibility = 'hidden';
  }

  loginForm = this.formBuilder.group({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit(): void {
  }
  
  login() {
    this.clickedGoogle = false;
    this.clickedFacebook = false;
    if (this.isRememberMeCheckboxChecked)
      window.localStorage.setItem('remember_email', this.loginForm.controls.email.value)
    this.isLoginError = false;
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(res => {
        // sauvegarder les infos du token
        this.authService.setSession(res.token);
        // aller vers home page
        this.activateChatbot();
        this.router.navigateByUrl('/');
      }, (err) => {
        this.isLoginError = true;
      })
  }

}
