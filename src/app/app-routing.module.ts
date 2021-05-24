import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { JoboffersComponent } from './pages/joboffers/joboffers.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileAdminComponent } from './pages/profile-admin/profile-admin.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path:'ProfileAdmin', component: ProfileAdminComponent},
  {path:'register',component: RegisterComponent },
  {path: 'offers', component: JoboffersComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
