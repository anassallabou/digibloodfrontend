import {BrowserModule, Title} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {SignupComponent} from './signup/signup.component';
import {UsersComponent} from './users/users.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatDialog} from '@angular/material/dialog';
import {UserTableService} from './services/user-table.service';
import {AddDialogComponent} from './dialogs/add/add-dialog/add-dialog.component';
import {EditDialogComponent} from './dialogs/edit/edit-dialog/edit-dialog.component';
import {DeleteComponent} from './dialogs/delete/delete.component';
import {GetUserComponent} from './get-user/get-user.component';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {LogoutComponent} from './logout/logout.component';
import {ViewallnotificationsComponent} from './viewallnotifications/viewallnotifications.component';
import {ViewallreminderComponent} from './viewallreminder/viewallreminder.component';
import {CalendarCreatorService} from './services/calendar-creator.service';
import {AlldaysComponent} from './alldays/alldays.component';
import {TokenInceptorService} from './services/token-inceptor.service';
import {AddappointmentComponent} from './addappointment/addappointment.component';
import {PastappointmentComponent} from './pastappointment/pastappointment.component';
import { ProfileanddashboardComponent } from './profileanddashboard/profileanddashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { MatListItemComponent } from './mat-list-item/mat-list-item.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { PastAppointmentsCenterComponent } from './center/past-appointments-center/past-appointments-center.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CenterDashboardComponent } from './center/center-dashboard/center-dashboard.component';
import { CenterProfileDashboardComponent } from './center/center-profile-dashboard/center-profile-dashboard.component';
import { NoPermissionComponent } from './no-permission/no-permission.component';
import { ActivatedAccountComponent } from './activated-account/activated-account.component';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SignupComponent,
    UsersComponent,
    AddDialogComponent,
    EditDialogComponent,
    DeleteComponent,
    GetUserComponent,
    LoginComponent,
    DashboardComponent,
    AddappointmentComponent,
    LogoutComponent,
    PastappointmentComponent,
    ViewallnotificationsComponent,
    ViewallreminderComponent,
    AlldaysComponent,
    ProfileanddashboardComponent,
    ProfileComponent,
    MatListItemComponent,
    PastAppointmentsCenterComponent,
    HomePageComponent,
    NotFoundComponent,
    CenterDashboardComponent,
    CenterProfileDashboardComponent,
    NoPermissionComponent,
    ActivatedAccountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    ScrollingModule,
    NgxPaginationModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    UploaderModule,
    NgbModule
  ],
  entryComponents: [
    AddDialogComponent,
    EditDialogComponent,
    DeleteComponent
  ],
  providers: [
    HttpClient,
    MatDialog,
    UserTableService,
    CalendarCreatorService,
    LoginComponent,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:TokenInceptorService,
      multi: true
    },
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
