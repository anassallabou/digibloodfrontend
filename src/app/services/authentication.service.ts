import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userId:number;
  private user: User;
  constructor(private httpClient: HttpClient) {
  }

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
    let user = localStorage.getItem('username');
    return !(user === null)
  }

  //Removes user session
  logOut() {
    sessionStorage.clear();
    localStorage.clear();
  }

  //Retrieves role of user
  getRole(username: String) {

    return this.httpClient.get('http://localhost:8086/getRole?username=' + username);
  }

  getUser(username: String) {
    return this.httpClient.get('http://localhost:8086/getUser?username=' + username);
  }

  getToken(){
    return localStorage.getItem('token');
}

}
