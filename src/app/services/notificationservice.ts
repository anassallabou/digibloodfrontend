import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class NotificationService {

  constructor(private httpClient: HttpClient) {
  }

  getNotificationsCount(userId: number) {
    return this.httpClient.get('http://localhost:8086/notification/getCount?userId=' + userId);
  }

  getNotifications(userId: number) {
    return this.httpClient.get('http://localhost:8086/notification/viewUnseen?userId=' + userId);
  }

  setSeen(notId: number) {
    return this.httpClient.get('http://localhost:8086/notification/setSeen?notId=' + notId);
  }

  getAllNotifications(userId: number) {
    return this.httpClient.get('http://localhost:8086/notification/viewById?userId=' + userId);
  }

}
