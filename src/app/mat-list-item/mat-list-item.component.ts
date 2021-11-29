import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {NavItems} from '../model/nav-items';
import {Router} from '@angular/router';
import {ProfileComponent} from '../profile/profile.component';
import {ProfileanddashboardComponent} from '../profileanddashboard/profileanddashboard.component';

@Component({
  selector: 'app-mat-list-item',
  templateUrl: './mat-list-item.component.html',
  styleUrls: ['./mat-list-item.component.css',
    './mat-list-item.component.scss'
  ],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class MatListItemComponent implements OnInit {

  expanded: boolean;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: NavItems;
  @Input() depth: number;

  constructor(private router:Router, private appointment:ProfileanddashboardComponent) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit() {
  }

  onItemSelected(item: NavItems) {
    if (!item.children || !item.children.length) {
      switch (item.route) {
        case 'addappointment':
          this.appointment.showAddAppt();
          break;
        case 'pastappointment':
          this.appointment.showPastAppt();
          break;
      }
    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }
}
