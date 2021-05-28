import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  profile: any;
  constructor(private userService: UserService) { 
    this.userService.getUserProfile().subscribe((profile) => {
      this.profile = profile;
    });
  }

  isAdmin() {
    return this.profile.email == 'mohamedchiboub97@gmail.com';
  }
selectedpage: boolean[]=[false,false,false,false];

  ngOnInit(): void {
    this.selectedpage[0]=true;
  }
  choosecomponent(i: any){
    this.selectedpage=[false,false,false,false];
    this.selectedpage[i]=true
  }

}
