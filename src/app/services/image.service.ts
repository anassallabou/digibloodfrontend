import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import {AuthenticationService} from './authentication.service';
import {UserService} from '../userService/user.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  imageToShow: any;

  constructor(
    private userService: UserService,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private authService:AuthenticationService
  ) { }

  getImageFromBlob(userId:number){
    this.http.get(this.userService.host+'photoProfile/'+userId,
      {
        headers: new HttpHeaders({
          'Authorization': `${this.authService.getToken()}`,
          'Content-Type': 'image/png',
        }), responseType: 'blob'}
    ).subscribe(data => {
        this.createImageFromBlob(data);
        /*let objectURL = 'data:image/jpeg;base64,' + data;
        this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);*/

      }
    );

  }
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
