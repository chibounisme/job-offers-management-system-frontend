import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';
@Component({
  selector: 'app-joboffers',
  templateUrl: './joboffers.component.html',
  styleUrls: ['./joboffers.component.css']
})
export class JoboffersComponent implements OnInit {
  options: any = {
    timeOut: 3000,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true
  };
  closeModal: string;
  constructor(private modalService: NgbModal, private _service: NotificationsService) { }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  triggerModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }
  onclick(){
    this._service.success("offre enregistré");}
  ngOnInit(): void {
    
  }
  created(event: any) { };
  destroyed(event: any) { };
}
