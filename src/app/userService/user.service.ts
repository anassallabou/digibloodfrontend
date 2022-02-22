import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import {User} from '../model/user.model';
import {AuthenticationService} from '../services/authentication.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private regitsterUrl: string;
  private usersGet: string;
  private baseUrl: string;
  public host: string = "http://localhost:8086/user/";
  public hoste: string = "http://localhost:8086/user/";
  private username: any;
  private user: User;




  constructor(private http: HttpClient, private authService:AuthenticationService) {
    this.regitsterUrl = 'http://localhost:8086/register';
    this.usersGet = 'http://localhost:8086/user/users';
    this.baseUrl = "http://localhost:8086/user/user";
    /*var header = {
      headers: new HttpHeaders().
      set('Authorization',  `Bearer ${AuthenticationService.getToken()}`)
    }*/
  }

  public save(user: User) {
    console.log(this.http.post<User>(this.regitsterUrl, user));
    return this.http.post<User>(this.regitsterUrl, user);
  }

  public updateUser(user: User, id) {
    return this.http.put("http://localhost:8086/user/updateuser/?userId="+id, user,
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
    return this.http.get('http://localhost:8086/user/search/lastName?lastName=' + lastName);
  }

  searchByEmail(emailId: String) {
    return this.http.get('http://localhost:8086/user/search/emailId?emailId=' + emailId);
  }

  searchByUserId(userId: number){
    return this.http.get('http://localhost:8086/user/getUserByUserId?userId=' + userId)
  }
  searchByUserId2(userId: number){
     this.http.get<User>('http://localhost:8086/user/getUserByUserId?userId=' + userId).subscribe((data:User) => {
     return this.user = data;
      }
    );
     return this.user;
  }

  searchUserByCity(city: string){
    return this.http.get('http://localhost:8086/user/getUserByCity?city=' + city)
  }


  uploadPhotoProduct(file: File, userId): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST',  'http://localhost:8086/user/uploadPhoto?userId=' + userId, formdata, {
      reportProgress: true,
      responseType: 'text',
    });

    return this.http.request(req);

  }

  getPhotoProfile(userId: number) {
    return this.http.get('http://localhost:8086/user/photoProfile/' + userId /*, {
      headers: {'Content-Type': 'image/jpg'},
      responseType: ResponseContentType.Blob
    }*/);
  }
}
