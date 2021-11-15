import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-dont-come-to-work',
  templateUrl: './dont-come-to-work.component.html',
  styleUrls: ['./dont-come-to-work.component.css']
})
export class DontComeToWorkComponent implements OnInit {

  constructor(public dialog: MatDialog,private toastr: ToastrService) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExample);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  ngOnInit(): void {
  }
 

}
@Component({
  selector: 'dialog-content-example',
  templateUrl: 'dialog-content-example.html',
})
export class DialogContentExample {
}
