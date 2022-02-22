import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../model/user.model';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userId:number;
  private user: User;
  private currentUserSubject: BehaviorSubject<User>;
  private isLoging: any;

  constructor(private httpClient: HttpClient, private authService:AuthenticationService) {}

  //Retrieves user token and checks authentication
  authenticate(username, password) {
    return this.httpClient.post<any>('http://localhost:8086/authenticate',
      {username, password}).subscribe(
      userData => {
        localStorage.setItem('username', username);
        localStorage.setItem('token', `Bearer ${userData.token}`);
        return userData;
      }
    );
  }

  //Checks if user is logged in

  isUserLoggedIn(): boolean {
      let token = localStorage.getItem('userId');
      return !(token === null)
  }

  //Removes user session
  logOut() {
    localStorage.clear();
  }

  //Retrieves role of user
  getRole(username: String) {
    return this.httpClient.get('http://localhost:8086/user/getRole?username=' + username, {responseType : 'text'}).pipe(map(res => {
      return res.valueOf();
    }
      ));
  }

  getUser(username: String) {
    return this.httpClient.get('http://localhost:8086/user/getUser?username=' + username,
      { headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
          'Authorization': `${this.getToken()}`,
    })
   })
  }

  getToken(){
    return localStorage.getItem('token');
}

  activatedAccount(token){
    return this.httpClient.get('http://localhost:8086/confirm-account?token='+token)
  }

}
