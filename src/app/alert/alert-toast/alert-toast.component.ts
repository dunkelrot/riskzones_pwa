import {Component, Inject, OnInit} from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import {AlertMessage} from '../../model/alert';

@Component({
  selector: 'app-alert-toast',
  templateUrl: './alert-toast.component.html',
  styleUrls: ['./alert-toast.component.css']
})
export class AlertToastComponent implements OnInit {

  ERROR = AlertMessage.ERROR;
  SUCCESS = AlertMessage.SUCCESS;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
