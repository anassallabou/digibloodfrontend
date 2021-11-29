import {Component, ViewChild} from '@angular/core';
import {SignUpService} from './sign-upService/sign-up.service';
import {Router} from '@angular/router';
import {MatSidenav} from '@angular/material';
import {delay} from 'rxjs/operators';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Digi Blood';
  public users;

  @ViewChild(MatSidenav, {static: true})
  sidenav!: MatSidenav;

  constructor(public signupService: SignUpService, public router: Router, private titleService:Title) {
    //this.router = _router.url;

  }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }

  private getUsers() {
    this.signupService.getUsers(this.signupService.host + "/users")
      .subscribe(data => {
        this.users = data;
      }, err => {
        console.log(err);
      })
  }


}
