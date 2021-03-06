import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { HomeComponent } from './pages/home/home.component';
import { JoboffersComponent } from './pages/joboffers/joboffers.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileAdminComponent } from './pages/profile-admin/profile-admin.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent , pathMatch: 'full'},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'profile-admin', component: ProfileAdminComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'offers', component: JoboffersComponent, canActivate: [AuthGuard] },
  {path:'dash' ,component:DashboardAdminComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
