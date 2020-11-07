import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneHistoryCases7Per100kComponent } from './zone-history-cases7-per100k.component';

describe('ZoneHistoryCases7Per100kComponent', () => {
  let component: ZoneHistoryCases7Per100kComponent;
  let fixture: ComponentFixture<ZoneHistoryCases7Per100kComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoneHistoryCases7Per100kComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneHistoryCases7Per100kComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
