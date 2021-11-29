import {User} from './user.model';

export class Reminder {
  remId: number;
  remMessage: String;
  usr: User;
  dueTime: any;
  active: boolean;
}
