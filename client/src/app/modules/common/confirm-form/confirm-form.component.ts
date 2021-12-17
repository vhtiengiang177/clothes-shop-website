import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmData } from 'src/app/services/model/confirm/confirm.model';

@Component({
  selector: 'app-confirm-form',
  templateUrl: './confirm-form.component.html',
  styleUrls: ['./confirm-form.component.css']
})
export class ConfirmFormComponent implements OnInit {
  confirmtext: string = ""

  constructor(public dialogRef: MatDialogRef<ConfirmFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmData) {
      this.confirmtext = data.text
     }

  ngOnInit() {
  }

  yes() {
    this.dialogRef.close(true);
  }
}
