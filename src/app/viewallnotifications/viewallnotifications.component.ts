import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../services/notificationservice';
import {Notification} from "../model/notification";

@Component({
  selector: 'app-viewallnotifications',
  templateUrl: './viewallnotifications.component.html',
  styleUrls: ['./viewallnotifications.component.css']
})
export class ViewallnotificationsComponent implements OnInit {

  userId: number;
  notList: Notification[];

  constructor(private notService: NotificationService) {
    this.userId = +localStorage.getItem('userId');
  }

  ngOnInit() {
    this.notService.getAllNotifications(this.userId).subscribe((data: Notification[]) => this.notList = data);
  }

}
