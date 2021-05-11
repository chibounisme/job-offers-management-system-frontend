import { Component, OnInit } from '@angular/core';
import Typewriter from 'typewriter-effect/dist/core';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import * as AOS from 'aos';
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
    AOS.init();
    var app = this.document.getElementById('typewriter');
    var typewriter = new Typewriter(app, {
      loop: true,
      delay: 75,
    });
    
    typewriter
      .pauseFor(2500)
      .typeString('welcome to our website')
      .pauseFor(300)
      .pauseFor(1000)
      .start();
  }
}


