import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneHistoryCasesPer100kComponent } from './zone-history-cases-per100k.component';

describe('ZoneHistoryComponent', () => {
  let component: ZoneHistoryCasesPer100kComponent;
  let fixture: ComponentFixture<ZoneHistoryCasesPer100kComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoneHistoryCasesPer100kComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneHistoryCasesPer100kComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
