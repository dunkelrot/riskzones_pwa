import {Component, Input, OnInit} from '@angular/core';
import { Zone } from 'src/app/model/zones';

@Component({
  selector: 'app-zone-details',
  templateUrl: './zone-details.component.html',
  styleUrls: ['./zone-details.component.css']
})
export class ZoneDetailsComponent implements OnInit {

  @Input('zone') zone: Zone;

  constructor() { }

  ngOnInit(): void {
  }

}
