import { Component, OnInit } from '@angular/core';

import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'job-offers-management-system-frontend';
  constructor(@Inject(DOCUMENT) private document: Document) {}
  ngOnInit(){
    this.document.querySelector(".navbar-toggler").addEventListener("click",()=>{
      if (this.document.querySelector(".collapse.navbar-collapse").classList.contains("show")){
        this.document.querySelector(".collapse.navbar-collapse").classList.remove("show")
      }
      else{this.document.querySelector(".collapse.navbar-collapse").classList.add("show")}
    })
    
  }
}


