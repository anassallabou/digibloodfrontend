import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-no-permission',
  templateUrl: './no-permission.component.html',
  styleUrls: ['./no-permission.component.css']
})
export class NoPermissionComponent implements OnInit {

  title = "No Permission - DigiBlood";

  constructor(private serviceTittle: Title) {
    this.serviceTittle.setTitle(this.title);
  }

  ngOnInit() {
  }

}
