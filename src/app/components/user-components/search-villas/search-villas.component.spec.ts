import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchVillasComponent } from './search-villas.component';

describe('SearchVillasComponent', () => {
  let component: SearchVillasComponent;
  let fixture: ComponentFixture<SearchVillasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchVillasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchVillasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
