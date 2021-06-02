import { Component, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { UserService } from './services/user.service';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'job-offers-management-system-frontend';
  profile = {
    email: ''
  };
  constructor(private userService: UserService, @Inject(DOCUMENT) private document: Document, public authService: AuthService, private router: Router, public loader: LoadingBarService) {
    if(this.authService.isLoggedIn()) {
      this.userService.getUserProfile().subscribe((profile) => {
        this.profile = profile;
      });
    }
  }
  ngOnInit() {
    // setTimeout(() => {
    //   this.document.getElementById('chatbot-chat').style.visibility = 'hidden';
    // }, 3000);
    this.document.querySelector(".navbar-toggler").addEventListener("click", () => {
      if (this.document.querySelector(".collapse.navbar-collapse").classList.contains("show")) {
        this.document.querySelector(".collapse.navbar-collapse").classList.remove("show")
      }
      else { this.document.querySelector(".collapse.navbar-collapse").classList.add("show") }
    })
  }
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}