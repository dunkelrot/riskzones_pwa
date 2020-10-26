import {Component, OnDestroy, OnInit} from '@angular/core';
import {RKIService} from '../../services/rki-service';
import {ZoneList, Zone} from '../../model/zones';
import {Router} from '@angular/router';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-show-selected-zones',
  templateUrl: './show-selected-zones.component.html',
  styleUrls: ['./show-selected-zones.component.css']
})
export class ShowSelectedZonesComponent implements OnInit, OnDestroy {

  zoneList: ZoneList = null;
  selectedZoneList: Array<Zone> = null;

  constructor(private rkiService: RKIService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.rkiService.getZones().subscribe((zoneList) => {
      this.zoneList = zoneList;
      this.selectedZoneList = zoneList.getSelected().sortByPositionIndex().zones;
    });
  }

  onSelectZones(): void {
    this.router.navigate(['/select']);
  }

  onAbout(): void {
    this.router.navigate(['/about']);
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.selectedZoneList, event.previousIndex, event.currentIndex);
    this.selectedZoneList.forEach((zone, index) => {
      zone.positionIndex = index;
    });
    this.zoneList.save();
    this.snackBar.open('Reihenfolge gespeichert.', '', {duration: 1500});
  }

  ngOnDestroy(): void {
  }
}
