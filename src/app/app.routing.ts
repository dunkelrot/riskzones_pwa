import {ShowSelectedZonesComponent} from './zones/show-selected-zones/show-selected-zones.component';
import {RouterModule, Routes} from '@angular/router';
import {SelectZonesComponent} from './zones/select-zones/select-zones.component';
import {AboutComponent} from './info/about/about.component';

const appRoutes: Routes = [
    { path: '', component: ShowSelectedZonesComponent },
    { path: 'select', component: SelectZonesComponent },
    { path: 'about', component: AboutComponent },
];

export const routing = RouterModule.forRoot(appRoutes);

