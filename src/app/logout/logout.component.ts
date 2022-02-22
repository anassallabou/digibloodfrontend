import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  title = "Logging Out - DigiBlood";
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private serviceTittle: Title) {
    this.serviceTittle.setTitle(this.title);
  }

  ngOnInit() {
    this.authenticationService.logOut();
    this.router.navigate(['login']);
  }


}
