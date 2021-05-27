import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {

  constructor() { }
selectedpage: boolean[]=[false,false,false,false];

  ngOnInit(): void {
    this.selectedpage[0]=true;
  }
  choosecomponent(i: any){
    this.selectedpage=[false,false,false,false];
    this.selectedpage[i]=true
  }

}
