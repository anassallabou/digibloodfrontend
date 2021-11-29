import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserTableService} from '../../services/user-table.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: UserTableService) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(id: number): void {
    console.log(id);
    this.dataService.deleteUser(id).subscribe(data => {
        console.log(data);
      },
      error => console.log(error));
  }
}
