import { ZonesListComponent } from './zones/zones-list/zones-list.component';
import {RouterModule, Routes} from '@angular/router';
import {AboutComponent} from './info/about/about.component';
import {ZoneInfoComponent} from './zones/zone-info/zone-info.component';
import {SettingsMainComponent} from './settings/settings-main/settings-main.component';
import { ZoneSelectionComponent } from './zones/zone-selection/zones-selection.component';

const appRoutes: Routes = [
    { path: '', component: ZonesListComponent },
    { path: 'select', component: ZoneSelectionComponent },
    { path: 'about', component: AboutComponent },
    { path: 'settings', component: SettingsMainComponent },
    { path: 'info/:id', component: ZoneInfoComponent },
];

export const routing = RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' });

