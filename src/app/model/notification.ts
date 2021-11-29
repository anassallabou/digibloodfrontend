import {User} from './user.model';


export class Notification {
  notId: number;
  toUser: User;
  fromUserId: String;
  notMessage: String;
  appointmentId: number;
  notTime: any;
  seen: boolean;
}
