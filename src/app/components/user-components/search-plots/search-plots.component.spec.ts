import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPlotsComponent } from './search-plots.component';

describe('SearchPlotsComponent', () => {
  let component: SearchPlotsComponent;
  let fixture: ComponentFixture<SearchPlotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPlotsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
