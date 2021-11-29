import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserTableService} from '../../../services/user-table.service';
import {FormControl, Validators} from '@angular/forms';
import {User} from '../../../model/user.model';
import {UserService} from '../../../userService/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
  public user: User;
  public spresp: any;
  public currentUser;
  public dataTable: any = [];

  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any = [],
              public dataService: UserTableService,
              private router: Router, private route: ActivatedRoute) {
  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  ngOnInit(): void {

  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit(id: number) {
    this.updateUser(id);
  }

  updateUser(id: number) {
    this.dataService.upDateUser(id, this.data)
      .subscribe(data => {
        this.user = this.data;
        console.log(this.user);
      }, error => console.log(error));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
