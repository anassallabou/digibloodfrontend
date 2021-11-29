import {User} from './user.model';

export class Day {
  public dayId: number
  public number: number;
  public year: number;

  public month: string;
  public monthIndex: number;
  public dayUser: User;
  public weekDayName: string;
  public weekDayNumber: number;
}
