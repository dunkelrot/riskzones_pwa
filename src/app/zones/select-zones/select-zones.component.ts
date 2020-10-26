import {Component, OnDestroy, OnInit} from '@angular/core';
import {Zone, ZoneFilter, ZoneList, ZoneNameFilter, ZoneSelectedFilter} from '../../model/zones';
import {RKIService} from '../../services/rki-service';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-select-zones',
  templateUrl: './select-zones.component.html',
  styleUrls: ['./select-zones.component.css']
})
export class SelectZonesComponent implements OnInit, OnDestroy {

  notDirty = true;
  zoneSearchValue = '';
  zoneList: ZoneList;
  filteredZones: Array<Zone> = [];

  keyCodes = [];

  selectedFilter: ZoneSelectedFilter = new ZoneSelectedFilter(true);
  nameFilter: ZoneNameFilter = new ZoneNameFilter('');

  filters = new Array<ZoneFilter>();

  constructor(private rkiService: RKIService, private router: Router, private location: Location) {
    this.filters.push(this.selectedFilter);
    this.filters.push(this.nameFilter);
  }

  ngOnInit(): void {
    this.rkiService.getZones().subscribe((zoneList) => {
      this.zoneList = zoneList;
      this.onFilter();
    });
  }

  onFilter(): void {
    this.filteredZones = this.zoneList.filter(this.filters).zones;
  }

  onToggleList(event: MatSlideToggleChange): void {
    if (event.checked === true) {
      this.selectedFilter.enabled = true;
    } else {
      this.selectedFilter.enabled = false;
    }
    this.onFilter();
  }

  ngOnDestroy(): void {
    this.zoneList.save();
  }

  onChange(event: InputEvent): void {
    this.nameFilter.enabled = true;
    this.nameFilter.filterValue = this.zoneSearchValue.toLocaleLowerCase();
    this.onFilter();
  }

  onClearSearchFilter(): void {
    this.zoneSearchValue = '';
    this.nameFilter.enabled = false;
    this.nameFilter.filterValue = this.zoneSearchValue;
    this.onFilter();
  }

  onSave(): void {
    this.location.back();
  }

  onHome(): void {
    this.router.navigate(['/']);
  }

  onZoneSelected(flag: boolean): void {
    this.notDirty = false;
  }

}
