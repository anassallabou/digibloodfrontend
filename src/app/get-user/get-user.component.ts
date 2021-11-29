import {Component, Input, OnInit} from '@angular/core';
import {User} from '../model/user.model';
import {UserService} from '../userService/user.service';
import {UserTableService} from '../services/user-table.service';
import {Observable} from 'rxjs';
import {SignUpService} from '../sign-upService/sign-up.service';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-get-user',
  templateUrl: './get-user.component.html',
  styleUrls: ['./get-user.component.css']
})
export class GetUserComponent implements OnInit {

  user: User;
  public data: any;
  public id;
  public currentUser;

  constructor(private userService: UserService,
              private dataService: UserTableService,
              public http: HttpClient,
              private router: Router, private route: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.user = new User();
    let id = this.route.snapshot.params.id;
    this.userService.getResource(this.userService.host + "user/" + id)
      .subscribe(data => {
        this.currentUser = data;
        console.log(this.currentUser);
      }, err => {
        console.log(err);
      })
  }

  updateUser() {
    this.dataService.upDateUser(this.route.snapshot.params.id, this.currentUser)
      .subscribe(data => {
        console.log(data);
        this.currentUser = new User();
        this.router.navigateByUrl('/users');
      }, error => console.log(error));
  }

  onSubmit() {
    this.updateUser();
  }
}
