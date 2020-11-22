import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {RKIService} from '../../services/rki-service';
import {Zone, ZoneList} from '../../model/zones';
import {Router} from '@angular/router';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {fromEvent, Observable, Subscription} from 'rxjs';
import {AlertService} from '../../services/alert-service';

@Component({
  selector: 'app-zones-list',
  templateUrl: './zones-list.component.html',
  styleUrls: ['./zones-list.component.css']
})
export class ZonesListComponent implements OnInit, OnDestroy {

  zoneList: ZoneList = null;
  selectedZoneList: Array<Zone> = null;
  error = '';
  showShare = true;

  @ViewChild('toolbar', {static: true}) toolbar: ElementRef;

  tbHeight = 64;
  svHeight = 0;

  constructor(private rkiService: RKIService, private router: Router, private alertService: AlertService) { }

  resizeObservable: Observable<Event>;
  resizeSubscription: Subscription;

  ngOnInit(): void {
    if (!navigator.share) {
      this.showShare = false;
    }

    this.rkiService.getZones().subscribe(
      (zoneList) => {
        this.zoneList = zoneList;
        this.selectedZoneList = zoneList.getSelected().sortByPositionIndex().zones;
        this.adjustScrollViewHeight(window.innerHeight);
      },
      error => {
        this.zoneList = new ZoneList(false);
        this.error = error;
        this.alertService.showError('Fehler - Keine oder fehlerhafte Daten erhalten.');
    });
    this.resizeObservable = fromEvent(window, 'resize');
    this.resizeSubscription = this.resizeObservable.subscribe((event: any) => {
      this.adjustScrollViewHeight(event.target.innerHeight);
    });
  }

  ngOnDestroy(): void {
    this.resizeSubscription.unsubscribe();
  }

  onSelectZones(): void {
    this.router.navigate(['/select']);
  }

  onAbout(): void {
    this.router.navigate(['/about']);
  }

  onSettings(): void {
    this.router.navigate(['/settings']);
  }

  onRemoveZone(zone: Zone): void {
    zone.selected = false;
    this.zoneList.saveSelectedIfValid();
    this.selectedZoneList = this.zoneList.getSelected().sortByPositionIndex().zones;
    this.alertService.showSuccess('Eintrag enfernt.', 1500);
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.selectedZoneList, event.previousIndex, event.currentIndex);
    this.selectedZoneList.forEach((zone, index) => {
      zone.positionIndex = index;
    });
    this.zoneList.saveSelectedIfValid();
    this.alertService.showSuccess('Reihenfolge gespeichert.', 1500);
  }

  adjustScrollViewHeight(windowHeight: number): void {
    this.svHeight = windowHeight - this.tbHeight;
  }

  onShare(): void {
    if (navigator.share) {
      navigator.share({
        title: 'CoronaRiskZones',
        text: 'Web-App für die Anzeige der Covid-19 7-Tage Inzidenzwerte.',
        url: 'https://pwa.risikogebiete.net'
      });
    }
  }
}
