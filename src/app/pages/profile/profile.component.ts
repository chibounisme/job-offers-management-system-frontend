import { Component, OnInit } from '@angular/core';

import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';
import { FormGroup, FormControl, ValidatorFn, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';

import { Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { JobService } from 'src/app/services/job.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  closeModal: string;

  options: any = {
    timeOut: 3000,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true,
    theClass: 'on-top'
  };
  profile: any = null;
  tags: any = [{ name: " amibitieux" }, { name: "serieux" }];

  profileForm = this.formBuilder.group({
    file: new FormControl(''),
    Nom: new FormControl('', Validators.minLength(3)),
    Prenom: new FormControl('', Validators.minLength(3)),
    mdp: new FormControl('', Validators.minLength(8)),
    cmdp: new FormControl('', [Validators.minLength(8), this.checkPassword()]),
    Email: new FormControl('', Validators.email),
    tel: new FormControl('', [Validators.minLength(8), Validators.pattern("[234579]{1}[0-9]{7}")]),
    adresse: new FormControl(''),
    Gouvernorat: new FormControl(''),
    Ville: new FormControl(''),
    Tags: new FormControl(''),
  });

  FormBuilder: any;

  constructor(private authService: AuthService, private userService: UserService, private modalService: NgbModal, private _service: NotificationsService, private formBuilder: FormBuilder, private jobservice: JobService) { }

  triggerModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
        console.log('ok');
        

      
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  ngOnInit(): void {
    this.userService.getUserProfile().subscribe((profile) => {
      this.profile = profile;
      profile.tags = profile.tags
        .map(tag => tag)
        .join('🔹');
    })
  }
  created(event: any) { };
  destroyed(event: any) { };
  onclick() {
    if (this.profileForm.valid) {
      // appel lel backend
      let updateProfile = {};
        if (this.profileForm.value.Nom)
          updateProfile = {
            ...updateProfile,
            last_name: this.profileForm.value.Nom
          }
        if (this.profileForm.value.Nom)
          updateProfile = {
            ...updateProfile,
            last_name: this.profileForm.value.Nom
          }
        if (this.profileForm.value.Prenom)
          updateProfile = {
            ...updateProfile,
            first_name: this.profileForm.value.Prenom
          }
        if (this.profileForm.value.Email)
          updateProfile = {
            ...updateProfile,
            email: this.profileForm.value.Email
          }
        if (this.profileForm.value.tel)
          updateProfile = {
            ...updateProfile,
            tel: this.profileForm.value.tel
          }
        if (this.profileForm.value.Gouvernorat)
          updateProfile = {
            ...updateProfile,
            state: this.profileForm.value.Gouvernorat
          }
        if (this.profileForm.value.adresse)
          updateProfile = {
            ...updateProfile,
            address: this.profileForm.value.adresse
          }
        if (this.profileForm.value.Ville)
          updateProfile = {
            ...updateProfile,
            city: this.profileForm.value.Ville
          }
        if (this.profileForm.value.Tags)
          updateProfile = {
            ...updateProfile,
            tags: this.profileForm.value.Tags
          }
        this.userService.updateProfile(updateProfile).subscribe(res => {
          this.profile = res;
          if(res.token) {
            this.authService.updateToken(res.token);
          }
          this._service.success("succés");
          this.modalService.dismissAll();
        }, err => {
          this.modalService.dismissAll();
            this._service.error("This email already exists");
        })
    }
  }
  checkPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const cmdp = control.value;
      return cmdp == this.profileForm?.value?.mdp ? null : { notSame: true };
    }
  }
  deletejobofferfromfavorites(joboffer) {
    this.jobservice.deleteJobToFavorites(joboffer.url_link).subscribe(oklm => {
      this.profile.favorites = this.profile.favorites.filter(job => job.url_link != joboffer.url_link);
      this._service.error("Offre supprimée");
    })

  }
}
