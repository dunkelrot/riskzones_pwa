import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonesListComponent } from './zones-list.component';

describe('ZonesListComponent', () => {
  let component: ZonesListComponent;
  let fixture: ComponentFixture<ZonesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZonesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
