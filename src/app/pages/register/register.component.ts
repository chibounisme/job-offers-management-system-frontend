import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators,FormBuilder } from '@angular/forms';
import Stepper from 'bs-stepper';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  profileForm = this.formBuilder.group({
    Email: new FormControl('', [Validators.required,Validators.email]),
    mdp: new FormControl('',[Validators.required, Validators.minLength(8)]),
    cmdp: new FormControl('', [Validators.required,Validators.minLength(8), this.checkPassword()]),
  });
FormBuilder:any;
  constructor(private formBuilder: FormBuilder, @Inject(DOCUMENT) private document: Document) { }
  stepper: Stepper;
  ngOnInit(): void {
    this.stepper = new Stepper(this.document.querySelector('.bs-stepper'));
  }

  onclick() {
    this.stepper.next();
  }

  checkPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const cmdp = control.value;
      return cmdp == this.profileForm?.value?.mdp ? null : { notSame: true };
    }
  }
}
