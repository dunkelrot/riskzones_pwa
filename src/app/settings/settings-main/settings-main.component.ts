import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SettingsService} from '../../services/settings-service';
import {Location} from '@angular/common';

class ThemeEntry {
  constructor(public name: string, public type: string) { }
}

@Component({
  selector: 'app-settings-main',
  templateUrl: './settings-main.component.html',
  styleUrls: ['./settings-main.component.css']
})
export class SettingsMainComponent implements OnInit {

  formGroup: FormGroup;
  days = Array.from({length: (29 - 1)}, (v, k) => k + 1);
  themeEntries = [];

  constructor(private formBuilder: FormBuilder, private settingsService: SettingsService, private location: Location) {
    this.themeEntries.push(new ThemeEntry('System', 'SYSTEM_DEFAULT'));
    this.themeEntries.push(new ThemeEntry('Dunkel', 'DARK_MODE'));
    this.themeEntries.push(new ThemeEntry('Hell', 'LIGHT_MODE'));

    this.formGroup = formBuilder.group({
      numberOfRecords: settingsService.settings.numberOfRecords,
      showCasesTotal: settingsService.settings.showCasesTotalPer100k,
      showCases7BlPer100k: settingsService.settings.showCases7BlPer100k,
      showDeaths: settingsService.settings.showDeaths,
      interpolateMissingRecords: settingsService.settings.interpolateMissingRecords,
      themeType: this.getThemeEntryByType(settingsService.settings.theme),
      animatedGraphs: this.settingsService.settings.animatedGraphs,
    });
  }

  ngOnInit(): void {

  }

  onSave(): void {
    this.settingsService.settings.numberOfRecords = this.formGroup.get('numberOfRecords').value;
    this.settingsService.settings.showCasesTotalPer100k = this.formGroup.get('showCasesTotal').value;
    this.settingsService.settings.showCases7BlPer100k = this.formGroup.get('showCases7BlPer100k').value;
    this.settingsService.settings.showDeaths = this.formGroup.get('showDeaths').value;
    this.settingsService.settings.theme = this.formGroup.get('themeType').value.type;
    this.settingsService.settings.animatedGraphs = this.formGroup.get('animatedGraphs').value;
    this.settingsService.saveToStorage();
    this.location.back();
  }

  getThemeEntryByType(type: string): ThemeEntry {
    let foundEntry = this.themeEntries[0];
    this.themeEntries.forEach((entry) => {
      if (entry.type === type) {
        foundEntry = entry;
      }
    });
    return foundEntry;
  }
}

