import {Reminder} from './reminder';
import {Appointment} from './appointment';
import {Notification} from "./notification";
import {Day} from './day';
import {Role} from './role';

export class User {
  userId: number;
  firstName: string;
  lastName: string;
  emailId: string;
  enable: boolean;
  notifications: Notification[];
  reminders: Reminder[];
  appointments: Appointment[];
  active: boolean;
  userName: string;
  photoName: string;
  city:string;
  address: string;
  phoneNumber:number;
  roles: Role;
}
