import {Component, OnInit} from '@angular/core';
import {trigger, state, transition, style, animate} from '@angular/animations';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {ReminderService} from '../services/reminderservice';
import {NotificationService} from '../services/notificationservice';
import {Notification} from '../model/notification';
import {AppointmentService} from '../services/appointmentservice';
import {AuthenticationService} from '../services/authentication.service';
import {UserService} from '../userService/user.service';
import {ImageService} from '../services/image.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  animations: [
    trigger('visibilityChanged', [
      state('shown', style({opacity: 1})),
      state('hidden', style({opacity: 0})),
      transition('shown => hidden', animate('600ms')),
      transition('hidden => shown', animate('300ms')),
    ])
  ]
})
export class NavBarComponent implements OnInit {

  userId: number;
  upcNotificationCount: number;
  notcounter: number;
  notificationsList: Notification[];
  isShown: boolean;
  isShownByAvatar: boolean;
  user: User;
  private icon = "/assets/photos/user.png";

  constructor(public httpClient: HttpClient, private router: Router, private appointmentService: AppointmentService
    , private reminderService: ReminderService, private notificationService: NotificationService,
              private authServ:AuthenticationService,
              private userService: UserService,
              private authService:AuthenticationService,
              private imageService: ImageService) {
    this.userId  = parseInt(localStorage.getItem("userId"), 10);

  }

  ngOnInit(): void {
    this.notificationService.getNotifications(this.userId).subscribe((data: Notification[]) => this.notificationsList = data);
    this.notificationService.getNotificationsCount(this.userId).subscribe((data: number) => this.upcNotificationCount = data);
    this.notificationService.getNotificationsCount(this.userId).subscribe((data: number) => this.notcounter = data);
    this.imageService.getImageFromBlob(this.userId);
    this.userService.searchByUserId(this.userId).subscribe((data:User) => { this.user = data });
    this.isShown = false;
    this.isShownByAvatar = false;
  }

  visiblityState = 'hidden';


  toggle() {
    if (this.visiblityState === 'hidden')
      this.visiblityState = 'shown';
    else
      this.visiblityState = 'hidden';
    this.notcounter = 0;

  }

  toggleShow() {this.isShown = ! this.isShown; this.isShownByAvatar = false}
  toggleAvShow() {this.isShownByAvatar = ! this.isShownByAvatar; this.isShown = false}

  /*getImageFromBlob(){
    this.httpClient.get(this.userService.host+'photoProfile/'+this.userId,
      {
        headers: new HttpHeaders({
          'Authorization': `${this.authService.getToken()}`,
          'Content-Type': 'image/png',
        }), responseType: 'blob'}
    ).subscribe(data => {
        console.log(data);
        this.createImageFromBlob(data);
      }
    );

  }
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }*/
}
