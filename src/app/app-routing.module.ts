import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SignupComponent} from './signup/signup.component';
import {UsersComponent} from './users/users.component';
import {GetUserComponent} from './get-user/get-user.component';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AddappointmentComponent} from './addappointment/addappointment.component';
import {PastappointmentComponent} from './pastappointment/pastappointment.component';
import {ViewallreminderComponent} from './viewallreminder/viewallreminder.component';
import {ViewallnotificationsComponent} from './viewallnotifications/viewallnotifications.component';
import {LogoutComponent} from './logout/logout.component';
import {AlldaysComponent} from './alldays/alldays.component';
import {AuthGuardService} from './services/authguardservice';
import {ProfileanddashboardComponent} from './profileanddashboard/profileanddashboard.component';
import {ProfileComponent} from './profile/profile.component';


const routes: Routes = [
  {path: 'signup', component: SignupComponent},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuardService]},
  {path: 'getuser/:id', component: GetUserComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent ,canActivate: [AuthGuardService]},
  {path: 'addappointment', component: AddappointmentComponent, canActivate: [AuthGuardService]},
  {path: 'pastappointment', component: PastappointmentComponent, canActivate: [AuthGuardService]},
  {path: 'viewreminders', component: ViewallreminderComponent, canActivate: [AuthGuardService]},
  {path: 'viewnotifications', component: ViewallnotificationsComponent, canActivate: [AuthGuardService]},
  {path: 'logout', component: LogoutComponent},
  {path: 'alldays', component: AlldaysComponent},
  {path: 'profile', component: ProfileanddashboardComponent, canActivate: [AuthGuardService]},
  {path: 'userprofile', component: ProfileComponent, canActivate: [AuthGuardService]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
