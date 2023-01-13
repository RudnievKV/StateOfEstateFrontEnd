import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseSearchSaleComponent } from './house-search-sale.component';

describe('HouseSearchSaleComponent', () => {
  let component: HouseSearchSaleComponent;
  let fixture: ComponentFixture<HouseSearchSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseSearchSaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseSearchSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
