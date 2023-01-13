import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialSearchRentComponent } from './commercial-search-rent.component';

describe('CommercialSearchRentComponent', () => {
  let component: CommercialSearchRentComponent;
  let fixture: ComponentFixture<CommercialSearchRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommercialSearchRentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommercialSearchRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
