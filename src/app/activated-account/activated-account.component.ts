import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-activated-account',
  templateUrl: './activated-account.component.html',
  styleUrls: ['./activated-account.component.css']
})
export class ActivatedAccountComponent implements OnInit {

  private confirmationToken;
  private activatedAccount: boolean;

  constructor(private route: ActivatedRoute, private authService: AuthenticationService) { }

  ngOnInit() {
    this.confirmationToken = this.route.snapshot.paramMap.get('token');
    this.authService.activatedAccount(this.confirmationToken).subscribe(value => {
      this.activatedAccount = !!value;
      console.log(this.activatedAccount)
    });
    console.log(this.confirmationToken);
  }

}
