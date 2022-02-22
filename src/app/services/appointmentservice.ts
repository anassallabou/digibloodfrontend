import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Appointment} from '../model/appointment';
import {Day} from '../model/day';
import {BehaviorSubject} from 'rxjs';
import {User} from '../model/user.model';

@Injectable({
  providedIn: 'root'
})

export class AppointmentService {

  dataChange: BehaviorSubject<Appointment[]> = new BehaviorSubject<Appointment[]>([]);
  private appointment;
  private  appointmentInCenter;
  private dataBase: any = [];

  constructor(private httpClient: HttpClient) {
  }

  addAppointment(appointment: Appointment, userId: number, startTime: String) {
    return this.httpClient.post('http://localhost:8086/appointment/add?organiserId=' + userId + '&startTime=' + startTime, appointment);
  }

  getUpcomingAppointmentsCount(userId: number) {
    return this.httpClient.get('http://localhost:8086/appointment/getCount?userId=' + userId);
  }

  getAppointments(userId: number) {
    return this.httpClient.get('http://localhost:8086/appointment/upcoming/view?userId=' + userId);
  }

  getNextAppointment(userId: number) {
    return this.httpClient.get('http://localhost:8086/appointment/getNext?userId=' + userId);
  }

  getPastAppointments(userId: number) {
    return this.httpClient.get('http://localhost:8086/appointment/past/view?userId=' + userId);
  }

  approveAppointment(appointmentId: number, userId: number) {
    return this.httpClient.get('http://localhost:8086/appointment/respond/approve?userId=' + userId + '&appointmentId=' + appointmentId);
  }

  maybeAppointment(appointmentId: number, userId: number) {
    return this.httpClient.get('http://localhost:8086/appointment/respond/maybe?userId=' + userId + '&appointmentId=' + appointmentId);
  }

  cancelAppointment(appointmentId: number, userId: number) {
    return this.httpClient.get('http://localhost:8086/appointment/respond/cancel?userId=' + userId + '&appointmentId=' + appointmentId);
  }

  getNextAppointmentsInCenter(userId: number){
    return this.httpClient.get('http://localhost:8086/appointment/center/upcoming/view?userId=' + userId);
  }

  getPastAppointmentsInCenter(userId: number){
    return this.httpClient.get('http://localhost:8086/appointment/center/past/view?userId=' + userId);
  }

  get data(): Appointment[] {
    return this.dataChange.value;
  }

  getAllAppointmentForUser(userId: number): void {
    this.httpClient.get<Appointment[]>('http://localhost:8086/appointment/past/view?userId=' + userId).subscribe(
      data => {
        this.appointment = data;
        console.log(this.appointment[1]);
        let i: number = 0;
        while (i < this.appointment.length) {
          this.dataBase.push(this.appointment[i]);
          i++;
        }
        console.log(this.dataBase);
        this.dataChange.next(this.dataBase);
        console.log(this.dataChange)
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      });
  }

  getAllPastAppointmentForCenter(userId: number): void {
    this.httpClient.get<Appointment[]>('http://localhost:8086/appointment/center/past/view?userId=' + userId).subscribe(
      data => {
        this.appointmentInCenter = data;
        console.log(this.appointmentInCenter[1]);
        let i: number = 0;
        while (i < this.appointmentInCenter.length) {
          this.dataBase.push(this.appointmentInCenter[i]);
          i++;
        }
        console.log(this.dataBase);
        this.dataChange.next(this.dataBase);
        console.log(this.dataChange)
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      });
  }
}
