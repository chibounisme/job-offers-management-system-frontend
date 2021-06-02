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
  searchTerm: string = "";
  jobSource: string = "all";
  jobType: string = "all";
  minSalary: number;
  maxSalary: number;
  isSerieuxChecked: boolean = false;
  isAmbitieuxChecked: boolean = false;
  isBosseurChecked: boolean = false;
  isDisciplineChecked: boolean = false;

  constructor(private viewPortScroller: ViewportScroller, private modalService: NgbModal, private _service: NotificationsService, private jobService: JobService) { }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  selectedjobindex: number;
  triggerModal(content, index) {

    this.selectedjobindex = index;
    this.jobs[this.selectedjobindex].description = this.jobs[this.selectedjobindex].description.replace(/(?:\r\n|\r|\n)/g, '<br>');
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: "xl" }).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });

  }

  onclick(jobId: any) {
    this.jobService.addJobToFavorites(jobId).subscribe(_ => {
      this._service.success("offre enregistré");
    });
  }

  jobs: any = [];

  ngOnInit(): void {
    this.searchJobs();
  }

  calculatePageNumbers() {
    this.previousPageNumber = this.currentPageNumber - 1;
    this.nextPageNumber = this.currentPageNumber + 1;
  }

  goToPreviousPage() {
    this.currentPageNumber--;
    this.searchJobs(true);
    this.viewPortScroller.scrollToPosition([0, 0]);

  }

  goToNextPage() {
    this.currentPageNumber++;
    this.searchJobs(true);
    this.viewPortScroller.scrollToPosition([0, 0]);
  }

  goToNextMany() {
    const futurePageNumber = this.currentPageNumber + 25;
    this.currentPageNumber = Math.min(futurePageNumber, this.totalPages);
    this.searchJobs(true);
    this.viewPortScroller.scrollToPosition([0, 0]);

  }
  goToPreviousMany() {
    const futurePageNumber = this.currentPageNumber - 25;
    this.currentPageNumber = Math.max(futurePageNumber, 1);
    this.searchJobs(true);
    this.viewPortScroller.scrollToPosition([0, 0]);

  }
  created(event: any) { };
  destroyed(event: any) { };

  searchJobs(dontChangePageNumber: boolean = false) {
    this.hasLoadedJobs = false;
    let options = {};
    if (this.searchTerm)
      options = {
        search: this.searchTerm
      };
    if (this.jobType != 'all')
      options = {
        ...options,
        type: this.jobType
      };
    if (this.jobSource != 'all')
      options = {
        ...options,
        source: this.jobSource
      };
    let tags = [];
    if (this.isAmbitieuxChecked) tags = ['ambitieux'];
    if (this.isBosseurChecked) tags = [...tags, 'bosseur'];
    if (this.isDisciplineChecked) tags = [...tags, 'discipliné'];
    if (this.isSerieuxChecked) tags = [...tags, 'sérieux'];
    if (tags.length)
      options = {
        ...options,
        tags
      }
    if (this.minSalary && this.maxSalary && this.maxSalary >= this.minSalary) {
      options = {
        ...options,
        min_salary: this.minSalary,
        max_salary: this.maxSalary,
      };
    }
    if (!dontChangePageNumber)
      this.currentPageNumber = 1;
    this.jobService.getJobs(this.currentPageNumber, options).subscribe((res: any) => {
      console.log(res);
      this.jobs = res.jobs;
      this.jobs.map(job => {
        job.tags = job.tags
          .map(tag => tag)
          .join('🔹'); return (job);
      })
      this.totalPages = res.totalPages;
      this.calculatePageNumbers();
      this.hasLoadedJobs = true;
    }, err => {
      console.log(err);
    });
  }

}

