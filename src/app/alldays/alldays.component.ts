import {Component, OnInit} from '@angular/core';
import {Day} from '../model/day';
import {DayService} from '../services/day.service';

@Component({
  selector: 'app-alldays',
  templateUrl: './alldays.component.html',
  styleUrls: ['./alldays.component.css']
})
export class AlldaysComponent implements OnInit {

  days: Day[];
  fixedDay: Day;
  userId: number;
  username: string;

  constructor(public dayService: DayService) {
    this.userId = +sessionStorage.getItem('userId');
    this.username = sessionStorage.getItem('username');
  }

  ngOnInit(): void {
    this.dayService.getAllDays(this.userId).subscribe((data: Day[]) => this.days = data);
    this.dayService.getFixedDay(this.userId).subscribe((data: Day) => this.fixedDay = data);

    console.log(this.days)
  }

}
