import {Component, OnInit} from '@angular/core';
import {ReminderService} from '../services/reminderservice';
import {Reminder} from '../model/reminder';

@Component({
  selector: 'app-viewallreminder',
  templateUrl: './viewallreminder.component.html',
  styleUrls: ['./viewallreminder.component.css']
})
export class ViewallreminderComponent implements OnInit {

  empId: number;
  reminderList: Reminder[];

  constructor(private reminderService: ReminderService) {
    this.empId = +localStorage.getItem('userId');
  }

  ngOnInit() {
    this.reminderService.getAllReminders(this.empId).subscribe((data: Reminder[]) => this.reminderList = data);
  }

}
