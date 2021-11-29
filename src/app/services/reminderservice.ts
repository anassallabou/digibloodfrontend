import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ReminderService {

  constructor(private httpClient: HttpClient) {
  }

  getUpcomingReminderCount(userId: number) {
    return this.httpClient.get('http://localhost:8086/reminder/getCount?userId=' + userId);
  }

  getUpcomingReminders(userId: number) {
    return this.httpClient.get('http://localhost:8086/reminder/upcoming/view?userId=' + userId);
  }

  getAllReminders(userId: number) {
    return this.httpClient.get('http://localhost:8086/reminder/view?userId=' + userId);
  }
}
