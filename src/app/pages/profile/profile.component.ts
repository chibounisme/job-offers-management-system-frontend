import { Component, OnInit } from '@angular/core';

import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';
import { FormGroup, FormControl, ValidatorFn, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';

import { Validators } from '@angular/forms';
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
    clickToClose: true
  };

  tags: any = [{ name: " amibitieux" }, { name: "serieux" }];

  profileForm = this.formBuilder.group({
    file: new FormControl(''),
    Nom: new FormControl('', Validators.minLength(3)),
    Prenom: new FormControl('', Validators.minLength(3)),
    mdp: new FormControl('', Validators.minLength(8)),
    cmdp: new FormControl('', [Validators.minLength(8), this.checkPassword()]),
    Email: new FormControl('', Validators.email),
    tel: new FormControl(''),
    adresse: new FormControl(''),
    Gouvernorat: new FormControl(''),
    Ville: new FormControl(''),
    Tags: new FormControl(''),
  });

  FormBuilder: any;

  constructor(private modalService: NgbModal, private _service: NotificationsService, private formBuilder: FormBuilder) { }

  triggerModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
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
  }
  created(event: any) { };
  destroyed(event: any) { };
  onclick() {
    console.log(this.profileForm);
    if (this.profileForm.valid) {
      // appel lel backend

      // ken el appel raja3 réponse valide
      if (true) {
        this._service.success("succés");
      } else {
        // sinon
        this._service.error("erreur");
      }
      this.modalService.dismissAll();
    }
  }
  checkPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const cmdp = control.value;
      return cmdp == this.profileForm?.value?.mdp ? null : { notSame: true };
    }
  }
}
