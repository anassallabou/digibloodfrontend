import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SignUpService} from '../sign-upService/sign-up.service';
import {User} from '../model/user.model';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, merge, fromEvent} from 'rxjs';
import {UserTableService} from '../services/user-table.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {AddDialogComponent} from '../dialogs/add/add-dialog/add-dialog.component';
import {EditDialogComponent} from '../dialogs/edit/edit-dialog/edit-dialog.component';
import {DeleteComponent} from '../dialogs/delete/delete.component';

/*export interface Element {
  userId: number;
  firstName: string;
  lastName: string;
  emailId: string;

}

const ELEMENT_DATA: Element[] = [
  {userId: 1, firstName: 'Hydrogen', lastName: 'test', emailId: 'H'},

];*/

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public users;
  displayedColumns = ['userId', 'firstName', 'lastName', 'emailId', 'actions'];
  exampleDatabase: UserTableService | null;
  dataSource: ExampleDataSource | null;
  index: number;
  id: number;


  constructor(public signupService: SignUpService,
              public httpClient: HttpClient,
              public dialog: MatDialog,
              public dataService: UserTableService) {
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter', {static: true}) filter: ElementRef;

  ngOnInit(): void {
    this.getUsers();
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  addNew(user: User) {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: {user: user}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        this.refreshTable();
      }
    });
  }

  startEdit(i: number, userId: number, firstName: string, lastName: string, emailId: string, enabled: boolean) {
    this.id = userId;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {userId: userId, firstName: firstName, lastName: lastName, emailId: emailId, enabled: enabled}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.userId === this.id);
        this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        this.refreshTable();
      }
    });
  }

  private getUsers() {
    this.signupService.getUsers(this.signupService.host + "/users")
      .subscribe(data => {
        this.users = data;
      }, err => {
        console.log(err);
      })
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  public loadData() {
    this.exampleDatabase = new UserTableService(this.httpClient);
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

  deleteItem(i: number, userId: number, firstName: string, lastName: string, emailId: string, enabled: boolean) {
    this.index = i;
    this.id = userId;
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {userId: userId, firstName: firstName, lastName: lastName, emailId: emailId, enabled: enabled}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.userId === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }
}

export class ExampleDataSource extends DataSource<User> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: User[] = [];
  renderedData: User[] = [];

  constructor(public _exampleDatabase: UserTableService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  connect(): Observable<User[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAllUsers();


    return merge(...displayDataChanges).pipe(map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.data.slice().filter((user: User) => {
        const searchStr = (user.userId + user.firstName + user.lastName + user.emailId).toString().toLowerCase();
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

  sortData(data: User[]): User  [] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'userId':
          [propertyA, propertyB] = [a.userId, b.userId];
          break;
        case 'firstName':
          [propertyA, propertyB] = [a.firstName, b.firstName];
          break;
        case 'lastName':
          [propertyA, propertyB] = [a.lastName, b.lastName];
          break;
        case 'emailId':
          [propertyA, propertyB] = [a.emailId, b.emailId];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
