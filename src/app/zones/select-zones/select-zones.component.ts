import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
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
export class SelectZonesComponent implements OnInit, OnDestroy, AfterViewInit {

  notDirty = true;
  zoneSearchValue = '';
  zoneList: ZoneList;
  filteredZones: Array<Zone> = null;

  keyCodes = [];

  selectedFilter: ZoneSelectedFilter = new ZoneSelectedFilter(true);
  nameFilter: ZoneNameFilter = new ZoneNameFilter('');

  filters = new Array<ZoneFilter>();

  constructor(private rkiService: RKIService, private router: Router, private location: Location) {
    this.filters.push(this.selectedFilter);
    this.filters.push(this.nameFilter);
  }

  ngOnInit(): void {
  }

  onFilter(): void {
    this.filteredZones = this.zoneList.filter(this.filters).zones;
  }

  onToggleList(event: MatSlideToggleChange): void {
    this.selectedFilter.enabled = event.checked === true;
    this.onFilter();
  }

  ngOnDestroy(): void {
    this.zoneList.save();
  }

  onChange(): void {
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

  onZoneSelected(): void {
    this.notDirty = false;
  }

  ngAfterViewInit(): void {
    this.rkiService.getZones().subscribe((zoneList) => {
      this.zoneList = zoneList;
      this.onFilter();
    });
  }

}
