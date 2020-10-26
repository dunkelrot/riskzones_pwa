import { Component, OnInit } from '@angular/core';
import {RKIService} from '../../services/rki-service';
import {ZoneList, Zone, ZoneSelectedFilter} from '../../model/zones';
import {Router} from '@angular/router';

@Component({
  selector: 'app-show-selected-zones',
  templateUrl: './show-selected-zones.component.html',
  styleUrls: ['./show-selected-zones.component.css']
})
export class ShowSelectedZonesComponent implements OnInit {

  zoneList: Array<Zone> = null;

  constructor(private rkiService: RKIService, private router: Router) { }

  ngOnInit(): void {
    this.rkiService.getZones().subscribe((zoneList) => {
      this.zoneList = zoneList.getSelected().zones;
    });
  }

  onSelectZones(): void {
    this.router.navigate(['/select']);
  }

  onAbout(): void {
    this.router.navigate(['/about']);
  }
}
