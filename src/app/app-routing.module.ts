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
import {PastAppointmentsCenterComponent} from './center/past-appointments-center/past-appointments-center.component';
import {RoleGuardServiceGuard} from './services/role-guard-service.guard';
import {HomePageComponent} from './home-page/home-page.component';
import {Role} from './model/role';
import {NotFoundComponent} from './not-found/not-found.component';
import {CenterDashboardComponent} from './center/center-dashboard/center-dashboard.component';
import {CenterProfileDashboardComponent} from './center/center-profile-dashboard/center-profile-dashboard.component';
import {NoPermissionComponent} from './no-permission/no-permission.component';
import {ActivatedAccountComponent} from './activated-account/activated-account.component';


const routes: Routes = [
  {path: 'register', component: SignupComponent},
  {path: 'admin/users', component: UsersComponent, canActivate: [AuthGuardService, RoleGuardServiceGuard],  data: { roles: [Role.ADMIN]}},
  {path: 'getuser/:id', component: GetUserComponent, canActivate: [AuthGuardService, RoleGuardServiceGuard],  data: { roles: [Role.ADMIN]}},
  {path: 'login', component: LoginComponent},
  {path: 'addappointment', component: AddappointmentComponent, canActivate: [AuthGuardService, RoleGuardServiceGuard],  data: { roles: [Role.USER]}},
  {path: 'pastappointment', component: PastappointmentComponent, canActivate: [AuthGuardService, RoleGuardServiceGuard],  data: { roles: [Role.USER]}},
  {path: 'viewreminders', component: ViewallreminderComponent, canActivate: [AuthGuardService, RoleGuardServiceGuard],  data: { roles: [Role.USER]}},
  {path: 'viewnotifications', component: ViewallnotificationsComponent, canActivate: [AuthGuardService, RoleGuardServiceGuard],  data: { roles: [Role.USER]}},
  {path: 'logout', component: LogoutComponent},
  {path: 'dashboard', component: ProfileanddashboardComponent, canActivate: [AuthGuardService, RoleGuardServiceGuard],  data: { roles: [Role.USER]}},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService, RoleGuardServiceGuard],  data: { roles: [Role.ADMIN, Role.USER, Role.CENTER]}},
  {path: 'center/pastappointment', component: PastAppointmentsCenterComponent, canActivate: [AuthGuardService, RoleGuardServiceGuard],  data: { roles: [Role.CENTER]}},
  {path: 'center/dashboard', component: CenterProfileDashboardComponent, canActivate: [AuthGuardService, RoleGuardServiceGuard],  data: { roles: [Role.ADMIN]}},
  { path: 'activate/:token', component: ActivatedAccountComponent },
  {path: 'home', component: HomePageComponent},
  {path : '', redirectTo : 'home', pathMatch : 'full' },
  { path: 'permission', component: NoPermissionComponent },
  { path: '**', component: NotFoundComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
