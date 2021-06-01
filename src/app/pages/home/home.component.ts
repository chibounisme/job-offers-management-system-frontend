import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import Typewriter from 'typewriter-effect/dist/core';

import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public authService : AuthService, @Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    AOS.init();
    var app = this.document.getElementById('typewriter');
    var typewriter = new Typewriter(app, {
      loop: true,
      delay: 75,
    });
    
    typewriter
      .pauseFor(2500)
      .typeString('Bienvenue sur 3MJobs')
      .pauseFor(300)
      .pauseFor(1000)
      .start();
  }

}
