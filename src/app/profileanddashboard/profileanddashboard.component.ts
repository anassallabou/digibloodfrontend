import {Component, HostBinding, Input, NgModule, OnInit, ViewChild} from '@angular/core';
import {delay} from 'rxjs/operators';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material';
import {Notification} from '../model/notification';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {AppointmentService} from '../services/appointmentservice';
import {ReminderService} from '../services/reminderservice';
import {NotificationService} from '../services/notificationservice';
import {AppComponent} from '../app.component';
import {AddappointmentComponent} from '../addappointment/addappointment.component';
import {BrowserModule, DomSanitizer, Title} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PastappointmentComponent} from '../pastappointment/pastappointment.component';
import {UserService} from '../userService/user.service';
import {User} from '../model/user.model';
import {AuthenticationService} from '../services/authentication.service';
import {ImageService} from '../services/image.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {NavItems} from '../model/nav-items';

@Component({
  selector: 'app-profileanddashboard',
  templateUrl: './profileanddashboard.component.html',
  styleUrls: ['./profileanddashboard.component.css'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class ProfileanddashboardComponent implements OnInit {


  title = 'Dashboard';

  @ViewChild(MatSidenav, {static: true})
  sidenav!: MatSidenav;
  userId: number;
  upcNotificationCount: number;
  notcounter: number;
  notificationsList: Notification[];
  isShown: boolean;
  pastApntmtShow: boolean;
  addApptShow: boolean;
  user: User;
  profileShow: boolean;
  private imageToShow: string | ArrayBuffer;
  dashboard: boolean;
  private isShownByAvatar: boolean;

  expanded: boolean;
  expanded1: boolean;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;

  constructor(private observer: BreakpointObserver, public httpClient: HttpClient,
              private router: Router, private appointmentService: AppointmentService,
              private reminderService: ReminderService, private notificationService: NotificationService,
              private userService: UserService,
              private sanitizer: DomSanitizer,
              private authService:AuthenticationService,
              private imageService: ImageService,
              private titleService: Title) {
    this.userId  = parseInt(localStorage.getItem("userId"), 10);


  }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.notificationService.getNotifications(this.userId).subscribe((data: Notification[]) => this.notificationsList = data);
    this.notificationService.getNotificationsCount(this.userId).subscribe((data: number) => this.upcNotificationCount = data);
    this.notificationService.getNotificationsCount(this.userId).subscribe((data: number) => this.notcounter = data);
    this.userService.searchByUserId(this.userId).subscribe((data:User) => {
      this.user = data;
      console.log(this.user);
    } );
    this.imageService.getImageFromBlob(this.userId);
    this.isShown = false;
    this.pastApntmtShow = false;
    this.addApptShow = false;
    this.dashboard = true;
    this.isShownByAvatar= false;
  }

  navItems: NavItems[] = [
    {
      displayName: 'Appointment',
      iconName: 'today',
      route: 'appointment',
      children: [
        {
          displayName: 'Add Appointment',
          iconName: 'add',
          route: 'addappointment',
        },
        {
          displayName: 'Old Appointment',
          iconName: 'skip_previous',
          route: 'pastappointment',
        },
        ]
    }
  ];
  isCollapsed: boolean = true;
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }

  toggleShow() {
    this.isShown = ! this.isShown;
  }

  showPastAppt(){
    this.pastApntmtShow = true;
    this.addApptShow = false;
    this.profileShow = false;
    this.dashboard = false;
  }
  showAddAppt(){
    this.addApptShow = true;
    this.pastApntmtShow = false;
    this.profileShow = false;
    this.dashboard = false;
  }
  showProfile(){
    this.profileShow = true;
    this.addApptShow = false;
    this.pastApntmtShow = false;
    this.dashboard = false;
  }

  dashShow() {
    this.profileShow = false;
    this.addApptShow = false;
    this.pastApntmtShow = false;
    this.dashboard = true;
  }

  toggleAvShow() {this.isShownByAvatar = ! this.isShownByAvatar; this.isShown = false}

  toggle(){
    this.expanded = ! this.expanded;
    this.expanded1 = false;

  }

  toggle1() {
    this.expanded1 = ! this.expanded1;
    this.expanded = false;
  }
}
