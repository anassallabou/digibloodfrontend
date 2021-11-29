import { Component, OnInit } from '@angular/core';
import {User} from '../model/user.model';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = "Login"

  username:String;
  password:String;
  user:User;
  invalidLogin:boolean=false;
  private userId: number;

  constructor(private router: Router, private loginservice: AuthenticationService, private serviceTittle: Title) { }

  ngOnInit(): void {
    localStorage.setItem('userId', null);
    sessionStorage.setItem('userId', null);
    this.serviceTittle.setTitle(this.title);
  }

  temp:number=0;

//Checks user authentication
  checkLogin() {
    if (this.loginservice.authenticate(this.username, this.password)) {
      this.loginservice.getRole(this.username).subscribe((data:User)=>{
        this.user = data;
      });
      localStorage.setItem("userId", String(this.user.userId));
      this.redirect();
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
      this.router.navigate(['profile']).then(()=>{
        window.location.reload();
      });;
    }
  }



}
