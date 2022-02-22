import {Component, OnInit} from '@angular/core';
import {User} from '../model/user.model';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {Title} from '@angular/platform-browser';
import {Role} from '../model/role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = "Login - Digi-Blood";

  username:String;
  password:String;
  user:User;
  invalidLogin:boolean=false;
  private userId: number;

  constructor(private router: Router, private loginservice: AuthenticationService, private serviceTittle: Title) { }

  ngOnInit(): void {
    localStorage.setItem('userId', null);
    this.loginservice.logOut();
    this.serviceTittle.setTitle(this.title);
  }

  temp:number=0;

//Checks user authentication
  checkLogin() {
    if (this.loginservice.authenticate(this.username, this.password)) {
      this.loginservice.getUser(this.username).subscribe((data:User)=>{
        localStorage.setItem("userId", JSON.stringify(data.userId));
        switch (data.roles){
          case (Role.ADMIN):
            this.router.navigate(['center/dashboard']);
            break;
          case (Role.USER):
            this.router.navigate(['dashboard']);
            break;
          case (Role.CENTER):
            this.router.navigate(['center/dashboard']);
            break;
        }
      });
      //localStorage.setItem("userId", String(this.user.userId));
      //this.redirect();
    } else{
      alert("Invalid Login Credentials.");
      this.invalidLogin = true;
    }

  }

  redirect(){
    this.temp++;
    if(this.temp==2){
      alert("Successfully Logged In.");
      this.invalidLogin = false;
      this.temp=0;
      this.router.navigate(['dashboard']).then(()=>{
        window.location.reload();
      });
    }
  }

  isAdmin(user:User){
    if(user){
      return user.roles == Role.ADMIN;
    }
    else return false;
  }



}
