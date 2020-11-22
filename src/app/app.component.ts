import {Component, OnInit} from '@angular/core';
import {SettingsService} from './services/settings-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CoronaRiskZones';

  constructor(private settingsService: SettingsService) {

  }

  ngOnInit(): void {
    this.settingsService.settings.getUpdates().subscribe(() => {
      this.changeTheme();
    });
    this.changeTheme();
  }

  changeTheme(): void {
    const element = document.getElementById('themeAsset') as any;
    if (this.settingsService.settings.theme === 'SYSTEM_DEFAULT') {
      if (window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches) {
        element.href = `assets/styles/pink-bluegrey.css`;
      } else {
        element.href = `assets/styles/indigo-pink.css`;
      }
    } else {
      if (this.settingsService.settings.theme === 'DARK_MODE') {
        element.href = `assets/styles/pink-bluegrey.css`;
      } else {
        element.href = `assets/styles/indigo-pink.css`;
      }
    }
  }

}
