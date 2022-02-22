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
import {UserService} from '../userService/user.service';
import {AuthenticationService} from '../services/authentication.service';
import {LoginComponent} from '../login/login.component';

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
  private userData: UserService | null;
  pastAppointmentsInCenter: Appointment[];
  dataSourceForCenter: DataSourceForCenter | null;
  private userLogged: User;
  exampleDatabaseForCenter: AppointmentService | null;
  private centerData: UserService | null;
  private isAdmin: boolean;

  constructor(private appointmentService: AppointmentService, private httpClient: HttpClient, private authService: AuthenticationService,
              private loginService: LoginComponent, private userService: UserService)  {
    this.userId = +localStorage.getItem('userId');
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter', {static: true}) filter: ElementRef;
  //Center
  @ViewChild(MatPaginator, {static: true}) paginatorCenter: MatPaginator;
  @ViewChild(MatSort, {static: true}) sortCenter: MatSort;
  @ViewChild('filterCenter', {static: true}) filterCenter: ElementRef;


  ngOnInit() {
   /* this.appointmentService.getPastAppointments(this.userId).subscribe((data: Appointment[]) => this.pastAppointments = data);
    this.appointmentService.getPastAppointmentsInCenter(this.userId).subscribe((data: Appointment[]) => this.pastAppointmentsInCenter = data);*/
    this.userService.searchByUserId(this.userId).subscribe((data:User) => {this.userLogged = data;});
    this.isAdmin = this.loginService.isAdmin(this.userLogged);
    this.loadData();
    //this.loadDataCenter();
  }

  public loadData() {
    this.exampleDatabase = new AppointmentService(this.httpClient);
    this.userData = new UserService(this.httpClient, this.authService);
    console.log(this.exampleDatabase);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, this.userData);
    this.dataSourceForCenter = new DataSourceForCenter(this.exampleDatabaseForCenter, this.paginatorCenter, this.sortCenter, this.centerData);
    console.log(this.dataSource || this.dataSourceForCenter);
    fromEvent(this.filter.nativeElement, 'keyup')
      .subscribe(() => {
        console.log(this.dataSource)
        if (!this.dataSource) {
          console.log(this.dataSource)
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
        this.dataSourceForCenter.filter = this.filterCenter.nativeElement.value;
      });
  }

  /*public loadDataCenter() {
    this.exampleDatabaseForCenter = new AppointmentService(this.httpClient);
    this.centerData = new UserService(this.httpClient, this.authService);
    console.log(this.exampleDatabaseForCenter);
    this.dataSourceForCenter = new DataSourceForCenter(this.exampleDatabaseForCenter, this.paginatorCenter, this.sortCenter, this.centerData);
    console.log(this.dataSource);
    fromEvent(this.filterCenter.nativeElement, 'keyup')
      .subscribe(() => {
        console.log(this.dataSourceForCenter);
        if (!this.dataSourceForCenter) {
          console.log(this.dataSourceForCenter);
          return;
        }
        this.dataSourceForCenter.filter = this.filter.nativeElement.value;
      });
  }*/

}

export class ExampleDataSource extends DataSource<Appointment> {
  _filterChange = new BehaviorSubject('');
  userId: number;
  pastAppointments: Appointment[];
  private organizer: User;

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
              public _sort: MatSort,
              public userService: UserService) {
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
          [propertyA, propertyB] = [a.organiser.lastName , b.organiser.lastName];
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

export class DataSourceForCenter extends DataSource<Appointment> {
  _filterChange = new BehaviorSubject('');
  userId: number;
  pastAppointments: Appointment[];
  private organizer: User;

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
              public _sort: MatSort,
              public userService: UserService) {
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

    this._exampleDatabase.getAllPastAppointmentForCenter(this.userId);


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
          [propertyA, propertyB] = [a.organiser.lastName , b.organiser.lastName];
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
