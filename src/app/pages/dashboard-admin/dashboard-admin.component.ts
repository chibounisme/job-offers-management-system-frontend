import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DashboardService } from 'src/app/services/dashboard.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  profile: any;
  dashboardData: any;
  maxFacebookValue: any = 50;
  maxGoogleValue: any = 50;
  maxEmailValue: any = 50;
  constructor(@Inject(DOCUMENT) private document: Document, private dashboardService: DashboardService, private userService: UserService,private sanitizer:DomSanitizer) {
    this.userService.getUserProfile().subscribe((profile) => {
      this.profile = profile;
      this.profile.image = 'http://127.0.0.1:3000/' + this.profile.image.split('\\').join('/');
    });
    this.dashboardData = null;
  }
  isAdmin() {
    return this.profile.email == 'mohamedchiboub97@gmail.com';
  }
  formatBytes(a, b = 2) { if (0 === a) return "0 Bytes"; const c = 0 > b ? 0 : b, d = Math.floor(Math.log(a) / Math.log(1024)); return parseFloat((a / Math.pow(1024, d)).toFixed(c)) + " " + ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d] }
  selectedpage: boolean[] = [false, false, false, false, false, false];
  tags: any;
  ngOnInit(): void {
    this.selectedpage[0] = true;
    this.dashboardService.getDashboardInformation().subscribe(data => {
      this.dashboardData = data;
      this.tags = Object.keys(this.dashboardData.tags);
    })
  }
  choosecomponent(i: any) {
    this.selectedpage = [false, false, false, false];
    this.selectedpage[i] = true
  }
  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
} 
}
