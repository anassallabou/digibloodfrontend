import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Day} from '../model/day';

@Injectable({
  providedIn: 'root'
})
export class DayService {

  constructor(private httpClient: HttpClient) {
  }

  addDay(day: Day, userId: number, time: String) {
    return this.httpClient.post('http://localhost:8086/day/addDay?organiserId=' + userId + '&time=' + time, day);
  }

  getAllDays(userId: number) {
    return this.httpClient.get('http://localhost:8086/day/getDays?userId=' + userId);
  }

  getFixedDay(userId: number) {
    return this.httpClient.get('http://localhost:8086/day/getFixedDay?userId=' + userId);
  }

}
