import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  public host: string = 'http://localhost:8084/';

  constructor(public http: HttpClient) {
  }

  public getUsers(url) {
    return this.http.get(url);
  }


}
