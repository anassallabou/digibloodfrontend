import { Component, OnInit } from '@angular/core';
import {Day} from '../model/day';
import {User} from '../model/user.model';
import {Appointment} from '../model/appointment';
import {Router} from '@angular/router';
import {AppointmentService} from '../services/appointmentservice';
import {CalendarCreatorService} from '../services/calendar-creator.service';
import {DayService} from '../services/day.service';
import {UserService} from '../userService/user.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {CenterserviceService} from '../services/centerservice.service';
import {Center} from '../model/center';

@Component({
  selector: 'app-addappointment',
  templateUrl: './addappointment.component.html',
  styleUrls: ['./addappointment.component.css'],
  animations: [trigger('visibilityChanged', [
    state('shown', style({opacity: 1})),
    state('hidden', style({opacity: 0})),
    transition('shown => hidden', animate('600ms')),
    transition('void => *', animate('0ms')),
  ])]
})
export class AddappointmentComponent implements OnInit {

  selected = false;
  today = new Date().getDate() - 1;
  selectedDayId: number;
  getDay: Day;
  day: Day = {
    dayId: null,
    month: "",
    monthIndex: null,
    number: null,
    year: null,
    weekDayName: "",
    weekDayNumber: null,
    dayUser: null
  };
  city:string;
  center: Center = {
    centerId: null,
    centerAddress:"",
    centerCity: "",
    user: null,
    appointments: null,
  };
  selectedDayMsg: String;
  isShown: boolean;
  active: boolean;
  showBtn: boolean;
  startTime: string;


  days: Day[];
  times = [{id: 1, datetime: "08:00"}, {id: 2, datetime: "08:30"}, {id: 3, datetime: "09:00"},
    {id: 4, datetime: "09:30"}, {id: 5, datetime: "10:00"}, {id: 6, datetime: "10:30"},
    {id: 7, datetime: "11:00"}, {id: 8, datetime: "11:30"}, {id: 9, datetime: "12:00"},
    {id: 10, datetime: "12:30"}, {id: 11, datetime: "13:00"}, {id: 12, datetime: "13:30"},
    {id: 13, datetime: "14:00"}, {id: 14, datetime: "14:30"}, {id: 15, datetime: "15:00"},
    {id: 16, datetime: "15:30"}, {id: 17, datetime: "16:00"}, {id: 18, datetime: "16:30"},
    {id: 19, datetime: "17:00"}, {id: 20, datetime: "17:30"}, {id: 21, datetime: "18:00"},
  ];
  centers = [
    {id:1, city:"Meknes", email:"contact@centredonation.com"},
    {id:2, city:"Fes", email:""}
    ];
  fixedDay: Day;
  //dayFormat: [];
  public monthDays: Day[];

  public monthNumber: number;
  public year: number;

  public weekDaysName = [];
  private dayCounter: number;

  ngOnInit(): void {
    this.setMonthDays(this.calendarCreator.getCurrentMonth());

    this.weekDaysName.push("Mo");
    this.weekDaysName.push("Tu");
    this.weekDaysName.push("We");
    this.weekDaysName.push("Th");
    this.weekDaysName.push("Fr");
    this.weekDaysName.push("Sa");
    this.weekDaysName.push("Su");


    console.log(this.today);
    //this.dayService.getDayByOrganizer(this.userId).subscribe((data:Day)=>this.days=data);
    //this.dayService.getAllDays(this.userId).subscribe((data:Day[])=>this.days=data);
    //this.dayService.getFixedDay(this.userId).subscribe((data:Day)=>this.fixedDay=data);
    this.isShown = false;
    this.active = false;
    this.showBtn = false;
  }

  userId: number;
  dayId: number;
  username: string;

  participantId: number;
  appointmentMotif: string;
  appointmentMotifs = [
    "Prend un rendez-vous de Donation",
    "Récuperer mais analyses",
    "test"
  ]

  userlastNameFound = false;
  userEmailFound = false;
  usrFound: User = {
    userId: 0,
    userName: "",
    emailId: "",
    active: true,
    firstName: "",
    lastName: "",
    enable: null,
    appointments: null,
    notifications: null,
    reminders: null,
    photoName: "",
    address: "",
    city: "",
    phoneNumber:null,
    roles: null
  };
  usrListFound: User[];

  nameSearchText: String;
  emailSearchText: String;
  time: String;

  appointment: Appointment = {
    active: true,
    endTime: null,
    location: "",
    appointmentId: null,
    appointmentTitle: "",
    organiser: null,
    day: null,
    participantStatus: null,
    centerId: null,
    startTime: null,
    donationCenter:null,
    organiserId: null
  };
  emailOfCity;
  centerFound: boolean;



  constructor(private router: Router,
              private usrService: UserService,
              private appointmentService: AppointmentService,
              public calendarCreator: CalendarCreatorService,
              public dayService: DayService,
              private centerService: CenterserviceService) {
    this.userId  = parseInt(localStorage.getItem("userId"), 10);
    this.username = localStorage.getItem('username');


    console.log(this.userId);
    console.log(this.username);
  }

  searchByName() {
    this.usrService.searchByLastName(this.nameSearchText).subscribe((data: User[]) => this.usrListFound = data);
    console.log(this.usrListFound);
    this.userlastNameFound = true;
    this.userEmailFound = false;
  }

  searchByEmail() {
    this.usrService.searchByEmail(this.emailSearchText).subscribe((data: User) => this.usrFound = data);
    this.userEmailFound = true;
    this.userlastNameFound = false;
  }


  sendEmail(val) {
    this.centers.forEach((value => {
      if(value.city == val){
        this.emailOfCity = value.email;
        this.usrService.searchByEmail(this.emailOfCity).subscribe((data: User) => this.usrFound = data);
        let userId = this.usrFound.userId;
        this.centerFound = true;
        let location = this.appointment.location;
        console.log(this.participantId);
      }
    }));
    
  }

  searchCenterByCity(val){
    this.usrService.searchUserByCity(val).subscribe((data: User) => {
      this.usrFound = data;
      console.log(this.usrFound);
    });
    this.centerFound = true;
  }

  addParticipant(userId: number) {
    this.participantId = userId ;
    console.log(this.participantId);
    alert("Participant Added");
    this.centerFound = false;
  }

  buttonDisable = true;

  addedAppointment: Appointment;

  addAppointment() {
    if (this.validNameFlag && this.validStartTimeFlag) {
      this.appointment.centerId = this.participantId;
      console.log(this.appointment.centerId);
      this.appointmentService.addAppointment(this.appointment, this.userId, this.startTime).subscribe((data: Appointment) => this.addedAppointment = data);
      alert("Appointment Added.Donation Center have been notified.");
      this.router.navigate(['profile']).then(() => {
        window.location.reload();
      });
    }
  }

  validNameFlag: boolean = true;

  validateTitle() {
    let title = this.appointment.appointmentTitle;
    this.validNameFlag = /^[a-zA-Z- -é]+$/.test(title);
    console.log(title);
  }

  validStartTimeFlag: boolean = true;

  validateStartTime(day, time) {
    this.day = day;
    let month = this.day.monthIndex + 1;
    let startTime = this.day.year + "-" + month + "-" + this.day.number + " " + time.datetime;
    let startTime2 = this.day.year + "-" + month + "-" + this.day.number + "T" + time.datetime;
    this.startTime = startTime;
    this.validStartTimeFlag = startTime2 > new Date().toISOString();
    if(this.validStartTimeFlag){
      this.buttonDisable = false;
    }
    console.log(startTime);
    console.log(" Time for now : " +  new Date().getDate());
    console.log(this.validEndTimeFlag);
  }

  validEndTimeFlag: boolean = true;

  validateEndTime() {
    let endTime = this.appointment.endTime;
    this.validEndTimeFlag = endTime > new Date().toISOString();
    if (this.validEndTimeFlag) {
      this.buttonDisable = false;
    }
  }

  /******************************* Calendar ***********************/

  onNextMonth(): void {
    this.monthNumber++;

    if (this.monthNumber == 13) {
      this.monthNumber = 1;
      this.year++;
    }

    this.setMonthDays(this.calendarCreator.getMonth(this.monthNumber, this.year));
  }

  onPreviousMonth(): void {
    this.monthNumber--;

    if (this.monthNumber < 1) {
      this.monthNumber = 12;
      this.year--;
    }

    this.setMonthDays(this.calendarCreator.getMonth(this.monthNumber, this.year));
  }

  private setMonthDays(days: Day[]): void {
    this.monthDays = days;
    this.monthNumber = this.monthDays[1].monthIndex;
    this.year = this.monthDays[1].year;
  }

  addDay: Day;

  onSelected(day, id) {
    day.active = !day.active;
    this.selectedDayId = id;
    this.day = day;
    this.selectedDayMsg = this.day.number + " " + this.day.month + " " + this.day.year;
    //this.dayService.addDay(this.day, this.userId).subscribe((data: Day) => this.addDay = data);
    // alert(this.selectedDayMsg);
  }

  visibilityStateDay = 'hidden';
  selectedId: number;

  toggle() {
    if (this.visibilityStateDay === 'hidden')
      this.visibilityStateDay = 'shown';
    else
      this.visibilityStateDay = 'hidden';
    console.log(1)

  }

  selectedTime(time, id) {
    this.active = !this.active;
    this.selectedId = id;
    console.log("from selected time")

  }

 // hide toggle function


  toggleShow() {
    this.isShown = ! this.isShown;
  }

  toggleShowBtns() {
    this.showBtn = ! this.showBtn;
  }

  addAppointmentTime(time, day) {
    this.day = day;
    this.isShown = false;
    day.active = !day.active;
    this.showBtn = false;
    this.time = time.datetime;
    let monthIndex = this.day.monthIndex + 1;
    this.dayService.addDay(this.day, this.userId, this.time).subscribe((data: Day) => this.addDay = data);
    console.log(this.day.year + "-" + monthIndex + "-" + this.day.number + " " + time.datetime);


  }

  cancelAppointment(time) {
    this.showBtn = false;
    this.selectedId == time.id;
  }



}


/*************************************************************************************************/

