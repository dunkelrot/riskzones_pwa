import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Zone} from '../../model/zones';

@Component({
  selector: 'app-zone-select',
  templateUrl: './zone-select.component.html',
  styleUrls: ['./zone-select.component.css']
})
export class ZoneSelectComponent implements OnInit {

  @Input('zone') zone: Zone;
  @Output() zoneSelected = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(): boolean {
    this.zone.selected = !this.zone.selected;
    this.zoneSelected.emit(this.zone.selected);
    return false;
  }
}

