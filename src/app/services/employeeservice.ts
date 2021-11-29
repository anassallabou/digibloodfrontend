import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user.model';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  constructor(private httpClient: HttpClient) {
  }

  searchByName(empName: String) {
    return this.httpClient.get('http://13.233.124.218:9088/employee/search/name?empName=' + empName);
  }

  searchByEmail(emailId: String) {
    return this.httpClient.get('http://13.233.124.218:9088/employee/search/email?empEmail=' + emailId);
  }

  addEmployee(user: User) {
    return this.httpClient.post('http://13.233.124.218:9088/employee/add', user);
  }

}
