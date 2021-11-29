import {Day} from './day';
import {User} from './user.model';


export class Appointment {
  appointmentId: number;
  appointmentTitle: string;
  startTime: any;
  endTime: any;
  organiser: User;
  day: Day;
  centerId: number;
  participantStatus: String;
  location: string;
  active: boolean;
  donationCenter: User;
}
