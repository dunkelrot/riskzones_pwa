import { ZonesListComponent } from './zones/zones-list/zones-list.component';
import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {RouterModule} from '@angular/router';
import {routing} from './app.routing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RKIService} from './services/rki-service';
import {HttpClientModule} from '@angular/common/http';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ZoneDetailsComponent } from './zones/zone-details/zone-details.component';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ZoneSelectComponent } from './zones/zone-select/zone-select.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';
import { AboutComponent } from './info/about/about.component';
import {SafeHtmlPipe} from './pipes/safe-html.pipe';
import {HelpService} from './services/help-service';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { AlertToastComponent } from './alert/alert-toast/alert-toast.component';
import {AlertService} from './services/alert-service';
import { ZoneInfoComponent } from './zones/zone-info/zone-info.component';
import { ZoneHistoryCasesPer100kComponent } from './zones/zone-history-cases-per100k/zone-history-cases-per100k.component';
import { BarGraphComponent } from './graphs/bar-graph/bar-graph.component';
import { ZoneHistoryCases7Per100kComponent } from './zones/zone-history-cases7-per100k/zone-history-cases7-per100k.component';
import { SettingsMainComponent } from './settings/settings-main/settings-main.component';
import {getSettings, SettingsService} from './services/settings-service';
import {MatSelectModule} from '@angular/material/select';
import { ZoneSelectionComponent } from './zones/zone-selection/zones-selection.component';
import {MatMenuModule} from '@angular/material/menu';
import { ZoneHistoryDeathsComponent } from './zones/zone-history-deaths/zone-history-deaths.component';
import { ZoneHistoryCases7BlPer100kComponent } from './zones/zone-history-cases7-bl-per100k/zone-history-cases7-bl-per100k.component';

@NgModule({
  declarations: [
    AppComponent,
    ZonesListComponent,
    ZoneSelectionComponent,
    ZoneDetailsComponent,
    ZoneSelectComponent,
    AboutComponent,
    SafeHtmlPipe,
    AlertToastComponent,
    ZoneInfoComponent,
    ZoneHistoryCasesPer100kComponent,
    BarGraphComponent,
    ZoneHistoryCases7Per100kComponent,
    SettingsMainComponent,
    ZoneHistoryDeathsComponent,
    ZoneHistoryCases7BlPer100kComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    RouterModule,
    routing,
    MatListModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatInputModule,
    DragDropModule,
    MatSnackBarModule,
    ScrollingModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatMenuModule,
  ],
  providers: [
    { provide: APP_INITIALIZER,
      multi: true,
      useFactory: getSettings,
      deps: [SettingsService]
    },
    RKIService,
    HelpService,
    AlertService,
    SettingsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
