import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandplotSearchSaleComponent } from './landplot-search-sale.component';

describe('LandplotSearchSaleComponent', () => {
  let component: LandplotSearchSaleComponent;
  let fixture: ComponentFixture<LandplotSearchSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandplotSearchSaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandplotSearchSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
