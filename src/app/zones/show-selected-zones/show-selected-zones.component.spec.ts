import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSelectedZonesComponent } from './show-selected-zones.component';

describe('ShowSelectedZonesComponent', () => {
  let component: ShowSelectedZonesComponent;
  let fixture: ComponentFixture<ShowSelectedZonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSelectedZonesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSelectedZonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
