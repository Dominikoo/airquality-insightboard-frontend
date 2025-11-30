import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirQualityMapPage } from './air-quality-map-page';

describe('AirQualityMapPage', () => {
  let component: AirQualityMapPage;
  let fixture: ComponentFixture<AirQualityMapPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AirQualityMapPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirQualityMapPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
