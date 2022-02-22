import {Injectable} from '@angular/core';
import {User} from '../model/user.model';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/xml',
    'Authorization': 'jwt-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserTableService {
  public host: string = 'http://localhost:8086/user/';
  public user;
  public dataBase: any = [];
  public urlUpdate: string;
  dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  smartphone: any = [];

  private log(message: string) {
    console.log(message);
  }

  constructor(private httpClient: HttpClient) {
  }

  get data(): User[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllUsers(): void {
    this.httpClient.get<User[]>(this.host + 'users').subscribe(data => {
        this.user = data;
        let i: number = 0;
        while (i < this.user._embedded.users.length) {
          this.dataBase.push(this.user._embedded.users[i]);
          i++;
        }
        console.log(this.dataBase)
        this.dataChange.next(this.dataBase)
        console.log(this.dataChange)
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      });
  }

  addUser(user: User): void {
    this.dialogData = user;
  }

  public upDateUser(id: number, value: User): Observable<Object> {
    this.dialogData = value;
    return this.httpClient.put(`${this.host}update/${id}`, value);
  }

  deleteUser(id: number): Observable<any> {
    console.log(id);
    return this.httpClient.delete(`${this.host}delete/${id}`, {responseType: 'text'});
  }

}
