import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectZonesComponent } from './select-zones.component';

describe('SelectZonesComponent', () => {
  let component: SelectZonesComponent;
  let fixture: ComponentFixture<SelectZonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectZonesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectZonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
