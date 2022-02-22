import {User} from './user.model';
import {Appointment} from './appointment';

export class Center{
  centerId:number;
  centerAddress:string;
  centerCity:string;
  user: User;
  appointments: Appointment[];
}
