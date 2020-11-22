import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneSelectionComponent } from './zones-selection.component';

describe('ZoneSelectionComponent', () => {
  let component: ZoneSelectionComponent;
  let fixture: ComponentFixture<ZoneSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoneSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
