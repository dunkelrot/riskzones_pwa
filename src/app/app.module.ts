import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ShowSelectedZonesComponent } from './zones/show-selected-zones/show-selected-zones.component';
import { SelectZonesComponent } from './zones/select-zones/select-zones.component';
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
import {FormsModule} from '@angular/forms';
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

@NgModule({
  declarations: [
    AppComponent,
    ShowSelectedZonesComponent,
    SelectZonesComponent,
    ZoneDetailsComponent,
    ZoneSelectComponent,
    AboutComponent,
    SafeHtmlPipe,
    AlertToastComponent,
    ZoneInfoComponent,
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
  ],
  providers: [
    RKIService,
    HelpService,
    AlertService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
