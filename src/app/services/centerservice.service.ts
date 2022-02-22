import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CenterserviceService {

  constructor(private httpClient: HttpClient,
              private sanitizer: DomSanitizer,
              private authService:AuthenticationService) { }

  getCenter(city: string){
    return this.httpClient.get('http://localhost:8086/center/getCenter?city=' + city, {
      headers: new HttpHeaders({
        'Authorization': `${this.authService.getToken()}`,
        'Content-Type': 'application/json',
      })});
  }
}
