import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneHistoryDeathsComponent } from './zone-history-deaths.component';

describe('ZoneHistoryDeathsComponent', () => {
  let component: ZoneHistoryDeathsComponent;
  let fixture: ComponentFixture<ZoneHistoryDeathsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoneHistoryDeathsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneHistoryDeathsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
