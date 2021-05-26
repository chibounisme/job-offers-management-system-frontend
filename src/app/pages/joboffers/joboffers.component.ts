import { DOCUMENT, ViewportScroller } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';
import { slide } from 'ngx-router-animations';
import { JobService } from 'src/app/services/job.service';
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
  hasLoadedJobs: boolean = false;
  previousPageNumber: number;
  currentPageNumber: number = 1;
  nextPageNumber: number;
  totalPages: number;
  closeModal: string;
  constructor( private viewPortScroller: ViewportScroller,private modalService: NgbModal, private _service: NotificationsService, private jobService: JobService) { }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
selectedjobindex: number ;
  triggerModal( content , index) {
    
    this.selectedjobindex = index;
    this.jobs[this.selectedjobindex].description=this.jobs[this.selectedjobindex].description.replace(/(?:\r\n|\r|\n)/g, '<br>');
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' , size: "xl" }).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
    
  }

  onclick() {
    this._service.success("offre enregistré");
  }

  jobs: any;

  ngOnInit(): void {
    this.getCurrentPageJobs();
  }

  getCurrentPageJobs() {
    this.hasLoadedJobs = false;
    this.jobService.getJobs(this.currentPageNumber, {}).subscribe((res: any) => {
      this.jobs = res.jobs;
      this.jobs.map(job => {
        job.tags = job.tags
          .map(tag => tag)
          .join('🔹'); return (job);
      })
      this.totalPages = res.totalPages;
      console.log(this.totalPages);
      this.calculatePageNumbers();
      this.hasLoadedJobs = true;
    }, err => {
      console.log(err);
    });
  }

  calculatePageNumbers() {
    this.previousPageNumber = this.currentPageNumber - 1;
    this.nextPageNumber = this.currentPageNumber + 1;
  }

  goToPreviousPage() {
    this.currentPageNumber--;
    this.getCurrentPageJobs();
    this.viewPortScroller.scrollToPosition([0, 0]);
    
  }

  goToNextPage() {
    this.currentPageNumber++;
    this.getCurrentPageJobs();
    this.viewPortScroller.scrollToPosition([0, 0]);
  }

  goToNextMany() {
    const futurePageNumber = this.currentPageNumber + 25;
    this.currentPageNumber = Math.min(futurePageNumber, this.totalPages);
    this.getCurrentPageJobs();
    this.viewPortScroller.scrollToPosition([0, 0]);
    
  }
  goToPreviousMany() {
    const futurePageNumber = this.currentPageNumber - 25;
    this.currentPageNumber = Math.max(futurePageNumber, 1);
    this.getCurrentPageJobs();
    this.viewPortScroller.scrollToPosition([0, 0]);
   
  }
  created(event: any) { };
  destroyed(event: any) { };
}

