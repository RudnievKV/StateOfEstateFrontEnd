import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseSearchRentComponent } from './house-search-rent.component';

describe('HouseSearchRentComponent', () => {
  let component: HouseSearchRentComponent;
  let fixture: ComponentFixture<HouseSearchRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseSearchRentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseSearchRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
