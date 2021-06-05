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
    if (this.authService.isLoggedIn()) {
      this.userService.getUserProfile().subscribe((profile) => {
        this.profile = profile;
      });
    }
  }

  readCookie(name: string) {
    var nameEQ = name + "=";
    var ca = this.document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
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