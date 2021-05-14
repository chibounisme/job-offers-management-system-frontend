import { Component, OnInit } from '@angular/core';

import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';
import { FormGroup, FormControl, ValidatorFn, FormBuilder } from '@angular/forms';

import { Validators } from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  closeModal: string;
  options:any={
    timeOut: 3000,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true
  };
 tags :any =[{name:" amibitieux"},{name:"serieux"}];
 profileForm =this.formBuilder.group({
  file: new FormControl(''),
  Nom: new FormControl('',Validators.minLength(3)),
  Prenom: new FormControl('',Validators.minLength(3)),
  mdp: new FormControl('',Validators.minLength(8)),
  cmdp: new FormControl(''),
  Email: new FormControl('',Validators.email),
  tel: new FormControl(''),
  adresse: new FormControl(''),
  Gouvernorat: new FormControl(''),
 Ville: new FormControl(''),
  Tags: new FormControl(''),
},{ validators: this.checkPasswords });
  FormBuilder: any;
  constructor(private modalService: NgbModal,private _service: NotificationsService, private formBuilder: FormBuilder) {}

  triggerModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
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
      return  `with: ${reason}`;
    }
  }
  ngOnInit(): void {
  }
  created(event: any){};
  destroyed(event: any){};
  onclick(){
    this._service.success("succés");
    console.warn(this.profileForm);
    
  }
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
  
    return password === confirmPassword ? null : { notSame: true }     
  }
}
