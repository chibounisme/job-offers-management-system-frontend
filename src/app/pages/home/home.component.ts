import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import Typewriter from 'typewriter-effect/dist/core';

import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
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
