import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DashboardService } from 'src/app/services/dashboard.service';
import { UserService } from 'src/app/services/user.service';
import * as moment from 'moment';
import { subscribeOn } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  sumJobi = 0;
  sumTanit = 0;
  sumEmplois = 0;
  multi = [
    {
      "name": "TanitJobs",
      "series": [

      ]
    },

    {
      "name": "Jobi",
      "series": [

      ]
    },

    {
      "name": "EmploisTunisie",
      "series": [

      ]
    }
  ];
  multi1 = [
    {
      "name": "Total des offres",
      "series": [

      ]
    }
  ]

  view: any[] = [600, 400];
  view1: any[] = [500, 400];
  users: any[];
  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Date';
  yAxisLabel: string = 'Nbr d"Offres par site';
  timeline: boolean = true;
  legendPosition: string = 'below';


  colorScheme = {
    domain: ['#47ACB1', '#F26522', '#FFCD33']
  };
  profile: any;
  dashboardData: any;
  maxFacebookValue: any = 50;
  maxGoogleValue: any = 50;
  maxEmailValue: any = 50;
  //first pie chart 
  single3 = [
  ];
  single4 = [
  ];
  view3: any[] = [1200, 400];
  // options
  gradient3: boolean = true;
  showLegend3: boolean = true;
  showLabels3: boolean = true;
  isDoughnut3: boolean = false;
  legendPosition3: string = 'below';

  colorScheme3 = {
    domain: ['#47ACB1', '#F26522', '#F9AA7B', '#542923', '#286C4F', '#646463', '#C9222B', '#FFE8AF', '#FFE8AF', '#FFCD33']
  };
  constructor(private router: Router, @Inject(DOCUMENT) private document: Document, private dashboardService: DashboardService, private userService: UserService, private sanitizer: DomSanitizer) {
    // Object.assign(this,{multi});

    this.dashboardService.getDashboardInformation().subscribe(data => {
      this.dashboardData = data;
      this.tags = Object.keys(this.dashboardData.tags);
      this.domaines = Object.keys(this.dashboardData.domaines);
      var startdate = moment().subtract(this.dashboardData.tanitJobCount.length, "days");
      var startdate1 = moment().subtract(this.dashboardData.tanitJobCount.length, "days");
      var startdate2 = moment().subtract(this.dashboardData.tanitJobCount.length, "days");
      this.multi[0].series = this.dashboardData.tanitJobCount.map((res, i) => {
        this.sumTanit += res;
        return { name: startdate.add(1, "days").format("DD-MM-YYYY"), value: res }
      }).slice(1);
      this.multi[1].series = this.dashboardData.jobiJobCount.map((res, i) => {
        this.sumJobi += res;
        return { name: startdate1.add(1, "days").format("DD-MM-YYYY"), value: res }
      }).slice(1);
      this.multi[2].series = this.dashboardData.emploiJobCount.map((res, i) => {
        this.sumEmplois += res;
        return { name: startdate2.add(1, "days").format("DD-MM-YYYY"), value: res }
      }).slice(1);
      this.multi1[0].series.push({
        value: this.multi[0].series[0].value + this.multi[1].series[0].value + this.multi[2].series[0].value,
        name: this.multi[0].series[0].name
      })
      for (let i = 1; i < this.dashboardData.jobiJobCount.length - 1; i++) {
        this.multi1[0].series.push({
          value: this.multi1[0].series[i - 1].value + this.multi[0].series[i].value + this.multi[1].series[i].value + this.multi[2].series[i].value,
          name: this.multi[0].series[i].name
        })
      }
      for (let tag of Object.keys(this.dashboardData.tags)) {
        this.single3.push({ name: tag, value: this.dashboardData.tags[tag] })
      }
      for (let domain of Object.keys(this.dashboardData.domaines)) {
        this.single4.push({ name: domain, value: this.dashboardData.domaines[domain] })
      }


    }

    )

    this.userService.getAllUsers().subscribe((users) => {
      this.users = users
      for (let prof of users) {
        if (prof.image)
          prof.image = 'https://powerful-basin-10007.herokuapp.com/' + prof.image.split('\\').join('/');
      }

    })
    this.userService.getUserProfile().subscribe((profile) => {
      this.profile = profile;
      if (this.profile.image)
        this.profile.image = 'https://powerful-basin-10007.herokuapp.com/' + this.profile.image.split('\\').join('/');
    });
  }
  onSelect(event) {
    // console.log(event);
  }
  onActivate(data): void {
    // console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  isAdmin() {
    return this.profile.email == 'mohamedchiboub97@gmail.com' || this.profile.email == 'tazbaki1919@gmail.com';
  }
  formatBytes(a, b = 2) { if (0 === a) return "0 Bytes"; const c = 0 > b ? 0 : b, d = Math.floor(Math.log(a) / Math.log(1024)); return parseFloat((a / Math.pow(1024, d)).toFixed(c)) + " " + ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d] }
  selectedpage: boolean[] = [false, false, false, false, false, false];
  tags: any;
  domaines: any;
  ngOnInit(): void {
    this.selectedpage[0] = true;

  }
  choosecomponent(i: any) {
    this.selectedpage = [false, false, false, false];
    this.selectedpage[i] = true
  }
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
