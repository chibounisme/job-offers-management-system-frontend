import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators, FormBuilder, AsyncValidatorFn } from '@angular/forms';
import Stepper from 'bs-stepper';
import { faThumbsUp, faThumbtack, faHashtag } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  faThumbsUp = faThumbsUp;
  faThumbtack = faThumbtack;
  faHashtag = faHashtag;
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
    adresse: new FormControl(''),
    Gouvernorat: new FormControl(''),
    Ville: new FormControl(''),
    Tags: new FormControl(''),
  });
  constructor(private formBuilder: FormBuilder
    , @Inject(DOCUMENT) private document: Document,
    private authService: AuthService) { }
  stepper: Stepper;
  ngOnInit(): void {
    this.stepper = new Stepper(this.document.querySelector('.bs-stepper'));
  }

  onclick1() {
    this.stepper.next();
  }
  onclick2() {
    // envoyer requete à travers le service
    this.authService.register({
      email: this.profileForm.value.Email,
      password: this.profileForm.value.mdp,
      first_name: this.profileForm2.value.Prenom,
      last_name: this.profileForm2.value.Nom,
      tel: this.profileForm2.value.tel,
      address: this.profileForm2.value.adresse,
      
    })
    this.stepper.next();
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