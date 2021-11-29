import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {Reminder} from '../model/reminder';
import {Router} from '@angular/router';
import { AppointmentService} from '../services/appointmentservice';
import {ReminderService} from '../services/reminderservice';
import {NotificationService} from '../services/notificationservice';
import {Notification} from '../model/notification';
import {HttpClient} from '@angular/common/http';
import {trigger, state, transition, style, animate} from '@angular/animations';
import {AuthenticationService} from '../services/authentication.service';
import {User} from '../model/user.model';
import {Appointment} from '../model/appointment';
import {Title} from '@angular/platform-browser';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('visibilityChanged', [
      state('shown', style({opacity: 1})),
      state('hidden', style({opacity: 0})),
      transition('shown => hidden', animate('600ms')),
      transition('hidden => shown', animate('300ms')),
    ])
  ]
})
export class DashboardComponent implements OnInit {
  title = 'Dashboard';

  userId: number;
  username: string;
  user: User;

  upcAppointmentsCount: number;
  upcReminderCount: number;
  upcNotificationCount: number;
  nextAppointment: Appointment;
  appointment: any;
  startTime:any;
  appointmentsList: Appointment[];
  reminderList: Reminder[];
  notificationsList: Notification[];
  notificationType: boolean[];
  p: any;
  p1: any;
  notcounter: number;
  time: string;
  nameOfDayApnt: string;
  dayOfApp: string;
  timeList: string;
  timeListe: string;
  currentDay = new Date().getDate();

  constructor(public httpClient: HttpClient,
              private router: Router,
              private appointmentService: AppointmentService,
              private reminderService: ReminderService,
              private notificationService: NotificationService,
              private authService: AuthenticationService,
              private titleService: Title) {
    this.userId  = parseInt(localStorage.getItem("userId"), 10);
    this.username = localStorage.getItem('username');

  }


  ngOnInit() {
    this.appointmentService.getUpcomingAppointmentsCount(this.userId).subscribe((data: number) => this.upcAppointmentsCount = data);
    this.notificationService.getNotificationsCount(this.userId).subscribe((data: number) => this.upcNotificationCount = data);
    this.notificationService.getNotificationsCount(this.userId).subscribe((data: number) => this.notcounter = data);
    this.reminderService.getUpcomingReminderCount(this.userId).subscribe((data: number) => this.upcReminderCount = data);
    this.appointmentService.getAppointments(this.userId).subscribe((data: Appointment[]) => {
      this.appointmentsList = data;
      console.log(this.appointmentsList);
      for(this.appointment in this.appointmentsList){
        //this.Day_name_list(this.appointmentsList[this.appointment]);
        this.timeListe = this.Day_name_list(this.appointmentsList[this.appointment]);
      }

    });
    this.appointmentService.getNextAppointment(this.userId).subscribe((data: Appointment) => this.nextAppointment = data);
    this.appointmentService.getNextAppointment(this.userId).subscribe((data: Appointment)=> {
      this.startTime = data.startTime;
      this.Day_name(this.startTime);
      console.log("data : "+this.startTime);
    });
    this.reminderService.getUpcomingReminders(this.userId).subscribe((data: Reminder[]) => this.reminderList = data);
    this.notificationService.getNotifications(this.userId).subscribe((data: Notification[]) => this.notificationsList = data);
    /*console.log(this.startTime);
    this.Day_name(this.startTime);*/
    this.titleService.setTitle(this.title);

  }


  approvedAppointment(appointmentId: number, notId: number) {
    this.appointmentService.approveAppointment(appointmentId, this.userId).subscribe();
    this.notificationService.setSeen(notId).subscribe();
    alert("Appointment Request Approved.");
    location.reload();
  }

  maybeMeeting(appointmentId: number, notId: number) {
    this.appointmentService.maybeAppointment(appointmentId, this.userId);
    this.notificationService.setSeen(notId);
    alert("Appointment Request Maybe.");
    location.reload();
  }

  cancelAppointment(appointmentId: number, notId: number) {
    this.appointmentService.cancelAppointment(appointmentId, this.userId);
    this.notificationService.setSeen(notId);
    alert("Appointment Request Cancelled.");
    location.reload();
  }

  setSeen(notId: number) {
    this.httpClient.post('http://localhost:8084/notification/setSeen?notId=', notId).subscribe();
    console.log(notId);

  }
  clearCount() {

  }

  visiblityState = 'hidden';

  toggle() {
    if (this.visiblityState === 'hidden')
      this.visiblityState = 'shown';
    else
      this.visiblityState = 'hidden';
    this.notcounter = 0;

  }
   Day_name(nextAppointment) {
    let myDate=nextAppointment;
    const dateStr = myDate;
    let [yyyy,mm,dd,hh,mi] = dateStr.split(/[/:\-T]/)
    let currentDate = new Date(`${yyyy}-${mm}-${dd}`);
    let day_name = currentDate.getDay();
    let days = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
    this.nameOfDayApnt = days[day_name];
    this.dayOfApp = `${yyyy}-${mm}-${dd}`;
    this.time = `${hh}:${mi}`;
    console.log("the name of Day : " + days[day_name]+ " " + `${dd} `+" at " + ` ${hh}:${mi}`);
  }

  Day_name_list(appointmentsTimeList) {
    let myDateList=appointmentsTimeList.startTime;
    console.log("the name of Day from appointment list : " + appointmentsTimeList.startTime);
    let days = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
    const dateListStr = myDateList;
    let [yyyy,mm,dd,hh,mi] = dateListStr.split(/[/:\-T]/);
    let currentDate = new Date(`${yyyy}-${mm}-${dd}`);
    let day_name = currentDate.getDay();
    this.nameOfDayApnt = days[day_name];
    this.dayOfApp = `${yyyy}-${mm}-${dd}`;
    this.timeList = `${hh}:${mi}`;
    console.log("the name of Day from appointment list : " + days[day_name]+ " " + `${dd} `+" at " + this.timeList);
    return days[day_name]+ " " + `${dd} `+" at " + this.timeList;
  }

  Day_name_liste(appointmentsTimeList) {
    let myDateList=appointmentsTimeList;
    console.log("the name of Day from appointment list : " + appointmentsTimeList);
    let days = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
    const dateListStr = myDateList;
    let [yyyy,mm,dd,hh,mi] = dateListStr.split(/[/:\-T]/);
    let currentDate = new Date(`${yyyy}-${mm}-${dd}`);
    let day_name = currentDate.getDay();
    this.nameOfDayApnt = days[day_name];
    this.dayOfApp = `${yyyy}-${mm}-${dd}`;
    this.timeList = `${hh}:${mi}`;
    console.log("the name of Day from appointment list : " + days[day_name]+ " " + `${dd} `+" at " + this.timeList);
    return days[day_name]+ " " + `${dd} - ${mm} `+" at " + this.timeList;
  }
  appointmentDay(appointmentsTime) {
    let myDateList=appointmentsTime;
    const dateListStr = myDateList;
    let [yyyy,mm,dd,hh,mi] = dateListStr.split(/[/:\-T]/);
    return `${dd}`;
  }
}
