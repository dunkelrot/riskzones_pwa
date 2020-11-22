import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Zone, ZoneFilter, ZoneList, ZoneNameFilter, ZoneSelectedFilter} from '../../model/zones';
import {RKIService} from '../../services/rki-service';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {fromEvent, Observable, Subscription} from 'rxjs';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';

@Component({
  selector: 'app-zones-selection',
  templateUrl: './zones-selection.component.html',
  styleUrls: ['./zones-selection.component.css']
})
export class ZoneSelectionComponent implements OnInit, OnDestroy {

  notDirty = true;
  zoneSearchValue = '';
  zoneList: ZoneList;
  filteredZones: Array<Zone> = null;

  tbHeight = 138;
  svHeight = 10;

  resizeObservable: Observable<Event>;
  resizeSubscription: Subscription;

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
      this.adjustScrollViewHeight(window.innerHeight);
    });
    this.resizeObservable = fromEvent(window, 'resize');
    this.resizeSubscription = this.resizeObservable.subscribe((event: any) => {
      this.adjustScrollViewHeight(event.target.innerHeight);
    });
  }

  ngOnDestroy(): void {
    this.resizeSubscription.unsubscribe();
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

  onFilter(): void {
    this.filteredZones = this.zoneList.filter(this.filters).zones;
  }

  onToggleList(event: MatSlideToggleChange): void {
    this.selectedFilter.enabled = event.checked === true;
    this.onFilter();
  }

  onSave(): void {
    this.zoneList.saveSelectedIfValid();
    this.location.back();
  }

  onHome(): void {
    this.location.back();
  }

  onZoneSelected(): void {
    this.notDirty = false;
  }

  adjustScrollViewHeight(windowHeight: number): void {
    const height = windowHeight - this.tbHeight;
    this.svHeight = height - 1;
  }

}
