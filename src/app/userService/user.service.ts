import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user.model';
import {AuthenticationService} from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl: string;
  private usersGet: string;
  private baseUrl: string;
  public host: string = "http://localhost:8086/";
  public hoste: string = "http://localhost:8086";




  constructor(private http: HttpClient, private authService:AuthenticationService) {
    this.usersUrl = 'http://localhost:8086/register';
    this.usersGet = 'http://localhost:8086/users';
    this.baseUrl = "http://localhost:8086/user";
    /*var header = {
      headers: new HttpHeaders().
      set('Authorization',  `Bearer ${AuthenticationService.getToken()}`)
    }*/
  }

  public save(user: User) {
    console.log(this.http.post<User>(this.usersUrl, user));
    return this.http.post<User>(this.usersUrl, user);
  }

  public updateUser(user: User, id) {
    return this.http.put("http://localhost:8086/updateuser/?userId="+id, user,
      {
        headers: new HttpHeaders({
          'Authorization': `${this.authService.getToken()}`,
          'Content-Type': 'application/json',
        })});
  }

  public getResource(url) {
    return this.http.get(url);
  }


  searchByLastName(lastName: String) {
    return this.http.get('http://localhost:8086/search/lastName?lastName=' + lastName);
  }

  searchByEmail(emailId: String) {
    return this.http.get('http://localhost:8086/search/emailId?emailId=' + emailId);
  }

  searchByUserId(userId: number){
    return this.http.get('http://localhost:8086/getUserByUserId?userId=' + userId)
  }


  uploadPhotoProduct(file: File, userId): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST',  'http://localhost:8086/uploadPhoto?userId=' + userId, formdata, {
      reportProgress: true,
      responseType: 'text',
    });

    return this.http.request(req);

  }

  getPhotoProfile(userId: number) {
    return this.http.get('http://localhost:8086/photoProfile/' + userId /*, {
      headers: {'Content-Type': 'image/jpg'},
      responseType: ResponseContentType.Blob
    }*/);
  }
}
