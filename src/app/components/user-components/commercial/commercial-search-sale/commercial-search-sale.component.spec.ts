import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialSearchSaleComponent } from './commercial-search-sale.component';

describe('CommercialSearchSaleComponent', () => {
  let component: CommercialSearchSaleComponent;
  let fixture: ComponentFixture<CommercialSearchSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommercialSearchSaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommercialSearchSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
