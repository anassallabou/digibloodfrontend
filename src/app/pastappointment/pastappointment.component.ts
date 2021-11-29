import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Appointment} from '../model/appointment';
import {AppointmentService} from '../services/appointmentservice';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {UserTableService} from '../services/user-table.service';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {DataSource} from '@angular/cdk/collections';
import {User} from '../model/user.model';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-pastappointment',
  templateUrl: './pastappointment.component.html',
  styleUrls: ['./pastappointment.component.css']
})
export class PastappointmentComponent implements OnInit {
  userId: number;
  public users;
  displayedColumns = ['appointmentId', 'appointmentTitle', 'startTime', 'lastName', 'location'];
  exampleDatabase: AppointmentService | null;
  dataSource: ExampleDataSource | null;
  index: number;
  id: number;

  pastAppointments: Appointment[];

  constructor(private appointmentService: AppointmentService, private httpClient: HttpClient) {
    this.userId = +localStorage.getItem('userId');
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter', {static: true}) filter: ElementRef;

  ngOnInit() {
    this.appointmentService.getPastAppointments(this.userId).subscribe((data: Appointment[]) => this.pastAppointments = data);
    this.loadData();
  }

  public loadData() {
    this.exampleDatabase = new AppointmentService(this.httpClient);
    console.log(this.exampleDatabase);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    console.log(this.dataSource);
    fromEvent(this.filter.nativeElement, 'keyup')
      .subscribe(() => {
        console.log(this.dataSource)
        if (!this.dataSource) {
          console.log(this.dataSource)
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

}

export class ExampleDataSource extends DataSource<Appointment> {
  _filterChange = new BehaviorSubject('');
  userId: number;
  pastAppointments: Appointment[];

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Appointment[] = [];
  renderedData: Appointment[] = [];

  constructor(public _exampleDatabase: AppointmentService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
    this.userId = +localStorage.getItem('userId');
  }

  connect(): Observable<Appointment[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAllAppointmentForUser(this.userId);


    return merge(...displayDataChanges).pipe(map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.data.slice().filter((appointment: Appointment) => {
        const searchStr = (appointment.appointmentId + appointment.appointmentTitle + appointment.startTime + appointment.organiser.lastName + appointment.location).toString().toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());


      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    }));


  }

  disconnect() {
  }

  sortData(data: Appointment[]): Appointment  [] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'appointmentId':
          [propertyA, propertyB] = [a.appointmentId, b.appointmentId];
          break;
        case 'appointmentTitle':
          [propertyA, propertyB] = [a.appointmentTitle, b.appointmentTitle];
          break;
        case 'lastName':
          [propertyA, propertyB] = [a.organiser.lastName, b.organiser.lastName];
          break;
        case 'startTime':
          [propertyA, propertyB] = [a.startTime, b.startTime];
          break;
        case 'location':
          [propertyA, propertyB] = [a.location, b.location];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
