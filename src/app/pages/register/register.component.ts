import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators, FormBuilder, AsyncValidatorFn } from '@angular/forms';
import Stepper from 'bs-stepper';
import { faThumbsUp, faThumbtack, faHashtag } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  faThumbsUp = faThumbsUp;
  faThumbtack = faThumbtack;
  faHashtag = faHashtag;
  registerErrorExists: boolean = false;
  selectedTags: any;
  tags: any = [{ name: " amibitieux" }, { name: "serieux" }];
  profileForm = this.formBuilder.group({
    Email: new FormControl('', [Validators.required, Validators.email]),
    mdp: new FormControl('', [Validators.required, Validators.minLength(8)]),
    cmdp: new FormControl('', [Validators.required, Validators.minLength(8), this.checkPassword()]),
  });
  profileForm2 = this.formBuilder.group({
    file: new FormControl(''),
    Nom: new FormControl('', Validators.minLength(3)),
    Prenom: new FormControl('', Validators.minLength(3)),
    tel: new FormControl('', [Validators.minLength(8), Validators.pattern("[234579]{1}[0-9]{7}")]),
    sexe: new FormControl(''),
    adresse: new FormControl(''),
    Gouvernorat: new FormControl(''),
    Ville: new FormControl('')
  });
  constructor(private socialAuthService: SocialAuthService, private formBuilder: FormBuilder
    , @Inject(DOCUMENT) private document: Document,
    private authService: AuthService, private router: Router) { }

  stepper: Stepper;
  isRegisterWithGoogle: boolean = false;
  isRegisterWithFacebook: boolean = false;
  googleEmail: string;
  facebookEmail: string;

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/');
    }
    this.stepper = new Stepper(this.document.querySelector('.bs-stepper'));
  }

  signInWithGoogle(): void {
    this.registerErrorExists = false;
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(data => {
        this.isRegisterWithGoogle = true;
        this.googleEmail = data.email;
        this.authService.checkEmail(data.email).subscribe(_ => {
          this.stepper.next();
        }, err => {
          this.registerErrorExists = true;
        });
      });
  }

  signInWithFacebook(): void {
    this.registerErrorExists = false;
    this.socialAuthService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then(data => {
        this.isRegisterWithGoogle = true;
        this.facebookEmail = data.email;
        this.authService.checkEmail(data.email).subscribe(_ => {
          this.stepper.next();
        }, err => {
          this.registerErrorExists = true;
        });
      });
  }


  onclick1() {
    this.stepper.next();
  }

  onclick2() {
    if (this.isRegisterWithGoogle) {
      this.authService.googleRegister({
        email: this.googleEmail,
        first_name: this.profileForm2.value.Prenom,
        last_name: this.profileForm2.value.Nom,
        tel: this.profileForm2.value.tel,
        sex: this.profileForm2.value.sexe,
        address: this.profileForm2.value.adresse,
        state: this.profileForm2.value.Gouvernorat,
        city: this.profileForm2.value.Ville,
        tags: this.selectedTags.map(tag => tag.$ngOptionLabel)
      }).subscribe(_ => {
        this.authService.saveLoginSocialMedia({ email: this.googleEmail })
          .subscribe((res: any) => {
            this.authService.setSessionSocialMedia(res.token, 'google');
            this.stepper.next();
          })
      }, err => {
        this.registerErrorExists = true;
        this.stepper.previous();
      });
    } else if (this.isRegisterWithFacebook) {
      this.authService.googleRegister({
        email: this.facebookEmail,
        first_name: this.profileForm2.value.Prenom,
        last_name: this.profileForm2.value.Nom,
        tel: this.profileForm2.value.tel,
        sex: this.profileForm2.value.sexe,
        address: this.profileForm2.value.adresse,
        state: this.profileForm2.value.Gouvernorat,
        city: this.profileForm2.value.Ville,
        tags: this.selectedTags.map(tag => tag.$ngOptionLabel)
      }).subscribe(_ => {
        this.authService.saveLoginSocialMedia({ email: this.facebookEmail })
          .subscribe((res: any) => {
            this.authService.setSessionSocialMedia(res.token, 'facebook');
            this.stepper.next();
          })
      }, err => {
        this.registerErrorExists = true;
        this.stepper.previous();
      });
    } else
      this.authService.register({
        email: this.profileForm.value.Email,
        password: this.profileForm.value.mdp,
        first_name: this.profileForm2.value.Prenom,
        last_name: this.profileForm2.value.Nom,
        tel: this.profileForm2.value.tel,
        sex: this.profileForm2.value.sexe,
        address: this.profileForm2.value.adresse,
        state: this.profileForm2.value.Gouvernorat,
        city: this.profileForm2.value.Ville,
        tags: this.selectedTags.map(tag => tag.$ngOptionLabel)
      }).subscribe(_ => {
        this.authService.login(this.profileForm.value.Email, this.profileForm.value.mdp).subscribe(res => {
          this.authService.setSession(res.token);
          this.stepper.next();
        });
      }, err => {
        this.registerErrorExists = true;
        this.stepper.previous();
      });
  }

  checkPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const cmdp = control.value;
      return cmdp == this.profileForm?.value?.mdp ? null : { notSame: true };
    }
  }

  // checkEmailIsValid(http: HttpClient): AsyncValidatorFn {
  //   return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
  //     console.log(control.value);
  //     http.post('http://localhost:3000/auth/check-email',
  //     { email: control.value }).subscribe(_ => console.log)
  //     return http.post('http://localhost:3000/auth/check-email',
  //       { email: control.value })
  //       .pipe(
  //         map((res: any) => {
  //           console.log('testing')
  //           return res.message === 'Email already used!'
  //             ? { emailExists: true } : null;
  //         })
  //       )
  //   }
  // }
}