import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneHistoryCases7BlPer100kComponent } from './zone-history-cases7-bl-per100k.component';

describe('ZoneHistoryCases7BlPer100kComponent', () => {
  let component: ZoneHistoryCases7BlPer100kComponent;
  let fixture: ComponentFixture<ZoneHistoryCases7BlPer100kComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoneHistoryCases7BlPer100kComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneHistoryCases7BlPer100kComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
