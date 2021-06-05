import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';
import 'rxjs/add/operator/filter';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.css']
})
export class ProfileAdminComponent implements OnInit {

  closeModal: string;

  options: any = {
    timeOut: 3000,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true
  };
  email: any;
  users: any;
  currentprofile: any;
  constructor( private router: Router, private sanitizer:DomSanitizer,private userService: UserService,private modalService: NgbModal, private _service: NotificationsService ,private route: ActivatedRoute) { }

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
    this.route.queryParams
      .filter(profile => profile.email)
      .subscribe(prof => {
        this.email = prof.email; 
        this.userService.getAllUsers().subscribe((users) =>{
          this.users= users
          this.currentprofile =users.filter(user => user.email == this.email)[0]
          if (this.currentprofile.image){
          this.currentprofile.image = 'https://powerful-basin-10007.herokuapp.com/' + this.currentprofile.image.split('\\').join('/');
          }
      }) 
      })
      
  }
  
  created(event: any) { };
  destroyed(event: any) { };
  onclick() {
    
    // supprimer le compte depuis la base
    this.userService.deleteUserProfile(this.currentprofile.email).subscribe(res => {
      console.log("hhhh")
      this._service.success("compte supprimé");
    
  this.router.navigateByUrl("/dash")
  this.modalService.dismissAll();}
  )
    
    }
    sanitize(url:string){
      return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  }
