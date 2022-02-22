import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  title = "Accueil - DigiBlood";

  constructor(private serviceTittle: Title) {
    this.serviceTittle.setTitle(this.title);
  }

  ngOnInit() {
  }

}
